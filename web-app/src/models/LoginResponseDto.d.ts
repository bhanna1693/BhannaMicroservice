import {User} from "./User";

export interface LoginResponseDto {
    result: {
        user: User,
        token: string
    }
}
