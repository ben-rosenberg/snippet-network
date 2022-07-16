const CONSTANTS = {
    SNIPPET_ELEMENT_NAMES: ['title', 'prefix', 'description', 'body'],
    ELEMENTS_STORED_IN_SESSION: {
        title_text: document.getElementById('title_text'),
        prefix_text: document.getElementById('prefix_text'),
        body_text: document.getElementById('body_text'),
        description_text: document.getElementById('description_text'),
        tab_stop_number: document.getElementById('tab_stop_number')
    }
};

export default CONSTANTS;