from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from typing import List
from api.schemas.contact_schema import ContactCreate, ContactResponse
from infrastructure.db.session import get_session
from infrastructure.db.models import ContactListModel, UserModel

router = APIRouter(prefix="/user")


async def get_caller(x_user_id: int = Header(..., alias="X-User-Id"), x_user_role: str | None = Header(None, alias="X-User-Role")):
    # Simple caller extraction from headers (stub for real auth)
    return {"id": x_user_id, "role": x_user_role or "user"}


@router.post("/{owner_id}/contacts", response_model=ContactResponse, status_code=201)
async def create_contact(owner_id: int, payload: ContactCreate, session: AsyncSession = Depends(get_session), caller: dict = Depends(get_caller)):
    # Authorization: only owner or admin can add contacts
    if caller.get("id") != owner_id and caller.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: only the owner or admin can add contacts")
    owner = await session.get(UserModel, owner_id)
    if not owner:
        raise HTTPException(status_code=404, detail="Owner user not found")

    # Validate contact user exists
    contact_user = await session.get(UserModel, payload.contact_user_id)
    if not contact_user:
        raise HTTPException(status_code=404, detail="Contact user not found")

    # Prevent duplicate contact
    stmt = select(ContactListModel).where(
        ContactListModel.owner_user_id == owner_id,
        ContactListModel.contact_user_id == payload.contact_user_id,
    )
    result = await session.execute(stmt)
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=409, detail="Contact already exists for this owner")

    # Create contact record
    db_contact = ContactListModel(owner_user_id=owner_id, contact_user_id=payload.contact_user_id)
    session.add(db_contact)
    try:
        await session.commit()
        await session.refresh(db_contact)
    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=409, detail="Contact already exists for this owner")

    return ContactResponse(
        contact_id=db_contact.contact_id,
        owner_user_id=db_contact.owner_user_id,
        contact_user_id=db_contact.contact_user_id,
        added_at=db_contact.added_at,
    )


@router.get("/{owner_id}/contacts", response_model=List[ContactResponse])
async def get_contacts(owner_id: int, session: AsyncSession = Depends(get_session), caller: dict = Depends(get_caller)):
    # Authorization: only owner or admin can list contacts
    if caller.get("id") != owner_id and caller.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: only the owner or admin can view contacts")

    owner = await session.get(UserModel, owner_id)
    if not owner:
        raise HTTPException(status_code=404, detail="Owner user not found")

    stmt = select(ContactListModel).where(ContactListModel.owner_user_id == owner_id)
    result = await session.execute(stmt)
    contacts = result.scalars().all()

    return [
        ContactResponse(
            contact_id=c.contact_id,
            owner_user_id=c.owner_user_id,
            contact_user_id=c.contact_user_id,
            added_at=c.added_at,
        )
        for c in contacts
    ]


@router.delete("/{owner_id}/contacts/{contact_id}")
async def delete_contact(owner_id: int, contact_id: int, session: AsyncSession = Depends(get_session), caller: dict = Depends(get_caller)):
    # Authorization: only owner or admin can delete contacts
    if caller.get("id") != owner_id and caller.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: only the owner or admin can delete contacts")
    owner = await session.get(UserModel, owner_id)
    if not owner:
        raise HTTPException(status_code=404, detail="Owner user not found")
    # Get the contact and ensure it belongs to owner
    db_contact = await session.get(ContactListModel, contact_id)
    if not db_contact or db_contact.owner_user_id != owner_id:
        raise HTTPException(status_code=404, detail="Contact not found for this owner")
    await session.delete(db_contact)
    await session.commit()

    return {"status": "deleted", "contact_id": contact_id}
