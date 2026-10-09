import { IsUrl } from "class-validator";

export class CreateUrlDto {
    @IsUrl({
        protocols: ["http", "https"],
        require_protocol: true
    }, {
        message: "Please provide a valid HTTP / HTTPS url"
    })
    url: string
}