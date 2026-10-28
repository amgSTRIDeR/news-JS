export interface RequestOptions {
    endpoint: string;
    options?: Record<string, string | undefined>;
}

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
}

class Loader {
    constructor(private baseLink: string | undefined, private options: Record<string, string | undefined>) {
    }

    getResp(
        { endpoint, options = {} }: RequestOptions,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(RequestMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string | undefined>, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: RequestMethod, endpoint: string, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
