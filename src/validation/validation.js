const emp =  require("../models/employeeModel");
const title =  require("../models/titleModel");


async function validate(body, curId = null) {
    const errors = [];
    const username = String(body.username ?? '').trim();
    const age = String(body.age ?? '').trim();
    const skills = String(body.skills ?? '').trim();
    const titleId = String(body.title_id ?? '').trim();
    
    await validateUsername(username, curId, errors);
    validateAge(age, errors);
    validateSkills(skills, errors);
    await validateTitle(titleId, errors);
    
    return { errors, data: { username, age, skills, title_id: titleId } };
}


async function validateUsername(username, curId, errors) {
 if (!username) {
        errors.push("Username is required.");
    }
    else if (!/^[A-Za-z0-9_.]{3,30}$/.test(username)) {
        errors.push("Username must be 3–30 characters: letters, digits, '_' or '.'.");        
    }
    else {
        const existing = await emp.findByUsername(username);
        if (existing && existing.id !== curId) errors.push(`${username} is taken.`);        
    }
}

function validateAge(age, errors) {
    if (!age) {
        errors.push('Age is required.');
    }
    else if (!/^\d+$/.test(age) || Number(age) < 16 || Number(age) > 100) {
        errors.push('Age must be a whole number between 16 and 100.');    
    }
}

function validateSkills(skills, errors) {
    if (!skills) {
        errors.push('Skills are required.');
    } 
    else if (skills.length > 200) {
        errors.push('Skills must be at most 200 characters.');
    }
}

async function validateTitle(titleId, errors) {
    if (!titleId) {
        errors.push('Title is required.');
    }
    else if (!/^\d+$/.test(titleId) || !(await title.findById(Number(titleId)))) {
        errors.push('Selected title does not exist.');
    }
}

module.exports = { validate };
