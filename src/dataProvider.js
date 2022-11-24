
import axios from 'axios';
import { stringify } from 'query-string';

export const getList = async (resource, params={}) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const { page, perPage } = params.pagination || {page: 1, perPage: 1000};
    let { field, order } = params.sort || {field: "_id", order: "DESC"};
    if (field === "id") 
        field = "_id";

    order = order === "DESC" ? -1 : 1;

    const query = {
        sort: JSON.stringify({[field]: order}),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter || {}),
    };
    
    const url = `${window["apiLocation"]}/${resource}?${stringify(query)}`;

    return axios.get(url).then((response) => {
        const range = response.headers["content-range"];

        const newJSON = (response.data || []).map(res => {
            const temp = res._id;
            delete res._id
            return { id: temp, ...res }
        })

        return {
            data: newJSON,
            total: parseInt(range.split('/').pop(), 10),
        }
    })

};

export const getOne = async (resource, params) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const url = `${window["apiLocation"]}/${resource}/${params.id}`;
    return axios.get(url).then(({ json }) => {
        const temp = json._id;
        delete json._id;

        return {
            data: { id: temp, ...json }
        }

    })
};

export const getMany = async (resource, params) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${window["apiLocation"]}/${resource}?${stringify(query)}`;

    return axios.get(url).then(({ json }) => {
        const newJSON = json.map(res => {
            const temp = res._id;
            delete res._id
            return { id: temp, ...res }
        })

        return {
            data: newJSON
        }

    });
};

export const getManyReference = async (resource, params) => {
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
    const url = `${window["apiLocation"]}/${resource}?${stringify(query)}`;

    return axios.get(url).then(({ headers, json }) => ({
        data: json.map((res) => ({ ...res, id: res._id })),
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
};

export const update = async (resource, { data, id }) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const url = `${window["apiLocation"]}/${resource}/${id}`;
    let dataBody = data || {};
    if (data && data.image) {
        dataBody = new FormData();  
        for (let key in data) {
            dataBody.append(key, key === "image" ? data[key].rawFile : data[key]);
        }
    }
    
    return axios.put(url, dataBody).then(({ data }) => ({ 
        data: { ...data, id: data._id } 
    }))
};

export const updateMany = async (resource, params) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${window["apiLocation"]}/${resource}?${stringify(query)}`;

    return axios.put(url, JSON.stringify(params.data)).then(({ json }) => ({ 
        data: { ...json, id: json._id } 
    }));
};

export const create = async (resource, { data }) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"
    
    const url = `${window["apiLocation"]}/${resource}`;
    let dataBody = data || {};
    if (data && data.image) {
        dataBody = new FormData();  
        for (let key in data) {
            dataBody.append(key, key === "image" ? data[key].rawFile : data[key]);
        }
    }

    return axios.post(url, dataBody).then(({ json }) => ({ 
        data: { ...data, id: json._id } 
    }))
};

export const deleteOne = async (resource, params) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const url = `${window["apiLocation"]}/${resource}/${params.id}`;

    return axios.delete(url).then(({ json }) => ({ 
        data: { ...json, id: json._id } 
    }))
};

export const deleteMany = async (resource, params) => {
    if (resource === "subcategories" || resource === "childcategories")
        resource = "categories"

    const query = { filter: JSON.stringify({ id: params.ids }) };
    const url = `${window["apiLocation"]}/${resource}?${stringify(query)}`;

    return axios.delete(url).then(({ json }) => ({ 
        data: [] 
    }));
};
