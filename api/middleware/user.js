//this middleware for filter "get all user"
const filterUsers = (query) => {
    const {
        firstName,
        lastName,
        email,
        password, //not now
        birthday, //not complete yet
        gender,
        profilPicture,
        coverPicture,
        createdAt,//not complete yet
        updatedAt,//not complete yet
        persons, // not now 

        select,
        sort,
        limit,
        skip
    } = query

    queryObject = {}
    if (firstName) {
        queryObject.firstName = firstName
    }
    if (lastName) {
        queryObject.lastName = lastName
    }
    if (email) {
        queryObject.email = email
    }
    if (gender) {
        queryObject.gender = gender
    }
    if (profilPicture) {
        queryObject.profilPicture = profilPicture
    }
    if (coverPicture) {
        queryObject.coverPicture = coverPicture
    }
    if (birthday) {
        queryObject.birthday = birthday
    }
    if (createdAt) {
        queryObject.createdAt = createdAt
    }
    if (updatedAt) {
        queryObject.updatedAt = updatedAt
    }

    queryOrder = {}
    if (select) {
        queryOrder.select = select.split(',').join(' ')
    }
    if (sort) {
        queryOrder.sort = sort.split(',').join(' ')
    }
    if (limit) {
        queryOrder.limit = Number(limit)
    }
    if (skip) {
        queryOrder.skip = Number(skip)
    }

    console.log({ queryOrder, queryObject });
    return { queryOrder, queryObject }

}

module.exports = {
    filterUsers,
}