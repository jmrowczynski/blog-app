export const removeEmptyParams = (params = {}) => {
    return Object.keys(params)
        .filter((key) => !!params[key])
        .reduce((total, item) => ({ ...total, item: params[item] }), {});
};
