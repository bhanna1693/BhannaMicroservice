import {User} from "./user";

export type SignUpResponseDto = LoginResponseDto

export interface LoginResponseDto {
    result: {
        user: User,
        token: string
    }
}
