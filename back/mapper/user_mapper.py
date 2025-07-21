from db.models.models import User
from dto.user_dto import UserCreate

def user_create_to_model(user_create: UserCreate) -> User:
    return User(
        email=user_create.email,
        password=user_create.password,  # hash dans le service !
    )