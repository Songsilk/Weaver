from dataclasses import dataclass

@dataclass(frozen=True)
class Email:
    value: str
    def __post_init__(self):
        if "@" not in self.value:
            raise ValueError("Invalid email")


@dataclass(frozen=True)
class Username:
    value: str
    def __post_init__(self):
        if len(self.value) < 3:
            raise ValueError("Username must be at least 3 chars")


@dataclass(frozen=True)
class AvatarURL:
    value: str


@dataclass(frozen=True)
class Biography:
    text: str
