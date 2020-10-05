export const fetchUsers = () => (
    $.ajax({
        url: 'api/users'
    })
);

export const fetchUser = (userId) => {
    // debugger;
    return $.ajax({
        url: `api/users/${userId}`
    })
};

export const updateUser = (formData, userId) => {
    // debugger;
    return $.ajax({
        method: 'PATCH',
        url: `/api/users/${userId}`,
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
    })
}