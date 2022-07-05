const EMPTY_SNIPPET_TEXT = "\"\": {\r\n"
    + "    \"prefix\": \"\",\r\n"
    + "    \"body\": [\r\n"
    + "        \"\"\r\n"
    + "    ],\r\n"
    + "    \"description\": \"\"\r\n"
    + "}";

const SNIPPET_BOILERPLATE = {
    title: {
        pre: EMPTY_SNIPPET_TEXT[0],
        post: EMPTY_SNIPPET_TEXT.substring(1, 7)
    },
    prefix: {
        pre: EMPTY_SNIPPET_TEXT.substring(7, 22),
        post: EMPTY_SNIPPET_TEXT.substring(22, 26)
    },
    body: {
        pre: EMPTY_SNIPPET_TEXT.substring(26, 50),
        post: EMPTY_SNIPPET_TEXT.substring(50, 61)
    },
    description: {
        pre: EMPTY_SNIPPET_TEXT.substring(61, 81),
        post: EMPTY_SNIPPET_TEXT.substring(81)
    }
};

export { EMPTY_SNIPPET_TEXT, SNIPPET_BOILERPLATE };