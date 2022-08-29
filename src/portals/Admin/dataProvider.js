
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:5000/admin';
const httpClient = fetchUtils.fetchJson;

const dataProvider = {

    getList: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const { page, perPage } = params.pagination;
        let { field, order } = params.sort;
        if (field === "id") 
            field = "_id";

        order = order === "DESC" ? -1 : 1;

        const query = {
            sort: JSON.stringify({[field]: order}),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({json}) => {
            const range = json.pop();

            const newJSON = json.map(res => {
                const temp = res._id;
                delete res._id
                return { id: temp, ...res }
            })

            return {
                data: newJSON,
                total: parseInt(range['content-range'].split('/').pop(), 10),
            }
        })

    },
    
    getOne: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url).then(({ json }) => {
            const temp = json._id;
            delete json._id;

            return {
                data: { id: temp, ...json }
            }

        })
    },

    getMany: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const query = { filter: JSON.stringify({ id: params.ids }) };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ json }) => {
            const newJSON = json.map(res => {
                const temp = res._id;
                delete res._id
                return { id: temp, ...res }
            })

            return {
                data: newJSON
            }

        });
    },

    getManyReference: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.map((res) => ({ ...res, id: res._id })),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, { data, id }) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const url = `${apiUrl}/${resource}/${id}`;
        let dataBody;
        if (data && typeof data.image === 'object') {
            dataBody = new FormData();  
            for (let key in data) {
                dataBody.append(key, key === "image" ? data[key].rawFile : data[key]);
            }
        }else {
            dataBody = JSON.stringify(data);
        }
        
        return httpClient(url, {
            method: 'PUT',
            body: dataBody,
        }).then(({ json }) => ({ data: { ...json, id: json._id } }))
    },

    updateMany: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const query = { filter: JSON.stringify({ id: params.ids }) };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: { ...json, id: json._id } }));
    },

    create: (resource, { data }) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"
        
        const url = `${apiUrl}/${resource}`;
        let dataBody;
        
        if (data && data.image) {
            dataBody = new FormData();  
            for (let key in data) {
                dataBody.append(key, key === "image" ? data[key].rawFile : data[key]);
            }
        }else {
            dataBody = JSON.stringify(data);
        }

        return httpClient(url, {
            method: 'POST',
            body: dataBody
        }).then(({ json }) => ({ data: { ...data, id: json._id } }))
    },

    delete: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const url = `${apiUrl}/${resource}/${params.id}`;

        return httpClient(url, { method: 'DELETE' })
            .then(({ json }) => ({ data: { ...json, id: json._id } }))
    },

    deleteMany: (resource, params) => {
        if (resource === "subcategories" || resource === "childcategories")
            resource = "categories"

        const query = { filter: JSON.stringify({ id: params.ids }) };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, {method: 'DELETE'})
            .then(({ json }) => ({ data: [] }));
    }

};

export default dataProvider;