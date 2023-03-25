import { generateUuid } from "@/util/generate_uuid";
import { createClient } from "@supabase/supabase-js";

export class SupabaseSource {
    supabase = createClient('https://xsnlxhmynqxqcatiizal.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzbmx4aG15bnF4cWNhdGlpemFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk0Njk5NTYsImV4cCI6MTk5NTA0NTk1Nn0.now3Tc7qqVPynJ3wealEdCDDj2B55ghH-AuzfyC4raU')

    register = async (email: string, password: string, name: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        //check literal
        if (email.length == 0 || password.length == 0 || name.length == 0) {
            onFailed('Fill all fields before click register')
            return
        }

        if (!(email.includes('@') && email.includes('.'))) {
            onFailed('Fill correct email format')
            return
        }

        if (password.length < 8) {
            onFailed('Password must contains 8 or more letters')
            return
        }

        //check email
        await this.supabase
            .from('user')
            .select('email')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                if (data.length > 0) {
                    onFailed('Email has been registered, try another email')
                    return
                }
            })

        //register
        await this.supabase
            .from('user')
            .insert({
                uid: generateUuid(),
                email: email,
                password: password,
                name: name
            })
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                onSuccess()
            })
    }

    login = async (email: string, password: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        this.supabase
            .from('user')
            .select('email, password')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                if (data.length == 0) {
                    onFailed('Email has not been registered, try to register first')
                    return
                }

                const user = data.map(row => {
                    return {
                        email: String(row.email),
                        password: String(row.password)
                    }
                })

                if (user[0].email == email && user[0].password == password) {
                    onSuccess()
                } else {
                    onFailed('Email or Password are incorrect')
                }
            })
    }
}