class UserSession {
    expiredTime = 30 * 60 * 1000
    cookie = ""

    createSession = (token: string) => {
        const date = new Date()
        date.setTime(date.getTime() + this.expiredTime)
        this.cookie = `accessToken=${token}; SameSite=Strict;`
        document.cookie = this.cookie+` Expires=${date.toUTCString()}`
    }

    removeSession = () => {
        document.cookie = this.cookie+` Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }

}

const instance = new UserSession()
export default instance