import {User} from "./user";

export interface LoginResponseDto {
    result: {
        user: User,
        token: string
    }
}
