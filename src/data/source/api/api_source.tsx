import axios from "axios";
import { LOGIN_URL, REGISTER_URL } from "./api_source_url";

export class ApiSource {
    login = async (email: string, password: string) => {
        const bodyData = {
            email: email,
            password: password
        }

        return await fetch(
            LOGIN_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            }
        )
    }

    register = async (email: string, password: string, name: string) => {
        const bodyData = {
            email: email,
            password: password,
            name: name
        }

        return await fetch(
            REGISTER_URL,
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            }
        )
    }
}