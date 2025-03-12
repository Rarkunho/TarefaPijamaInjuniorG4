import { UsersRepository } from "src/repositories/users-repository"
import { InvalidCredentialsError } from "../errors/invalid-credentials"
import { compare } from "bcryptjs"

interface AuthenticateUserUseCaseRequest{
    email: string,
    password : string
}

interface AuthenticateUserUseCaseResponse{
    boolean : boolean
}

export class AuthenticateUserUseCase {
    constructor(private usersRepository : UsersRepository){

    }
    async execute({email, password} : AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if (!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await compare(password, user.password)

        if(!doesPasswordMatch){
            throw new InvalidCredentialsError()
        }

        return {boolean : true}
    }
}
