'use strict';

const fs = require('fs');

function read_json_file(file_name) {
    let rawdata = fs.readFileSync(file_name);
    return JSON.parse(rawdata);    
}

const all_attachments = []
const suites = read_json_file('allure-report/data/suites.json');
for(let config of suites.children) {
    for(let suite of config.children) {
        for(let test_case of suite.children) {
            const c = {
                config: config.name,
                suite: suite.name,
                test_case: test_case.name,
                attachments: []
            }
            const test_case_data = read_json_file('allure-report/data/test-cases/' + test_case.uid + '.json');
            for(let attachment of test_case_data.testStage.attachments) {
                c.attachments.push(attachment);
            }
            all_attachments.push(c);
        }
    }
}

let data = JSON.stringify(all_attachments);
fs.writeFileSync('allure-report/data/all_attachments.json', data);
