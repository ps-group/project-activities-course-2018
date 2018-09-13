function getOlderStaff(staffs) {
    const keys = Object.keys(staffs);
    if (keys.length == 0) {
        return null;
    }

    let maxName = keys[0];
    let maxValue = staffs[maxName];
    for (const name of keys) {
        if (maxValue < staffs[name]) {
            maxName = name;
            maxValue = staffs[name];
        }
    }
    return {
        name: maxName,
        age: maxValue,
    }
}

function main() {
    const staff = {
        "Вася": -23,
        "Петя": -27,
        "Даша": -22,
    };
    const olderStaff = getOlderStaff(staff);
    console.log(olderStaff);
}

main();