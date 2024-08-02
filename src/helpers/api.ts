export interface Response<T = any> {
    data?: T | string,
    status: number;
    statusText: string;
    headers: Record<string, any>;
    request?: any;
}

class API {
    baseUrl = 'http://localhost:3000'

    authorization = ''

    request = async <T>(url: string, method: string, body = null, headers: Record<string, any> = {}): Promise<Response<T> | null> => {
        if (this.authorization.length !== 0) {
            headers.authorization = this.authorization
        }
        try {
            const response = await fetch(`${this.baseUrl}/${url}`, {
                method: method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            })
            const res: Response<T> = {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            }
            const contentType = response.headers.get('Content-Type')
            if (contentType) {
                if (contentType.includes('application/json')) {
                    const obj = await response.json()
                    res.data = obj
                }
                else{
                    const text = await response.text()
                    res.data = text
                }
            }
            return res
        }
        catch (ex) {
            console.error(ex)
            return null
        }
    }

    authorize = (token: string) => {
        this.authorization = token
    }

    unauthorize = () => this.authorization = ''

    get = <T>(url: string, headers = {}): Promise<Response | null> => this.request(url, 'GET', null, headers)

    post = <T>(url: string, body: any, headers = {}): Promise<Response | null> => this.request(url, 'POST', body, headers)

    put = <T>(url: string, body: any, headers = {}): Promise<Response | null> => this.request(url, 'PUT', body, headers)

    del = <T>(url: string, headers = {}): Promise<Response | null> => this.request(url, 'DELETE', null, headers)

}

const instance = new API()
export default instance