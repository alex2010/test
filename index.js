/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, items) =>
    items.map((it) =>
        Object.keys(it).reduce((obj, key) => {
            !props.includes(key) && (obj[key] = it[key])
            return obj
        }, {}))


exports.excludeByProperty = (prop, items) => items.filter((it) => it[prop] === undefined)

exports.sumDeep = (items) =>
    items.map((it) => {
        return {
            objects: it.objects.reduce((sum, obj) => {
                return sum += obj.val
            }, 0)
        }
    });

exports.applyStatusColor = (statusColor, items) => {
    const colorMap = Object.keys(statusColor).reduce((obj, color) => {
        statusColor[color].forEach((code) => obj[code] = color)
        return obj;
    }, {})

    return items.reduce((ret, it) => {
        colorMap[it.status] && ret.push({...it, color: colorMap[it.status]})
        return ret
    }, [])
};
exports.createGreeting = (greet, words) => (name) => greet(words, name);

exports.setDefaults = (defProps) => {
    return (obj) => {
        return Object.keys(defProps).reduce((obj, key) => {
            obj[key] === undefined && (obj[key] = defProps[key])
            return obj
        }, obj)
    }
};

exports.fetchUserByNameAndUsersCompany = (name, services) => {
    return services.fetchUsers().then((users) => {
        const user = users.find((it) => it.name === name)
        return Promise.all([
            services.fetchStatus(),
            services.fetchCompanyById(user.companyId)
        ]).then(([status, company]) => {
            return {user, company, status}
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
};
