const { Schema } = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "FundoNote By Typescript",
            version: "1.0.0",
            description: "API documentation using Swagger for the fundonotes by typescript",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
        tags: [
            {
                "name": "Google keep using express CLI",
                "description": "This is the replica of google keep"
            }
        ],
        paths: {
            '/user': {
                get: {
                    tags: ["users"],
                    description: "Get all the users of the fundonotes",
                    responses: {
                        "201": {
                            description: "User fetched successfully",
                        },
                        "400": {
                            description: "Bad Request",
                        }
                    }
                }
            },
            '/user/sign': {
                post: {
                    tags: ["users"],
                    summary: "Register a new user",
                    description: "Creates a new user account after validating the request body",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        fname: { type: "string", example: "jayesh" },
                                        lname: { type: "string", example: "tapdiya" },
                                        email: { type: "string", format: "email", example: "jayesh@gamil.com" },
                                        password: { type: "string", format: "password", example: "StrongPass@123" }
                                    },
                                    required: ["fname", "lname", "email", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User registered successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: { type: "string", example: "User created successfully" },
                                            userId: { type: "string", example: "64f1a2b93cd12345ef6789ab" }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Validation error / Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: { type: "string", example: "Email already exists" }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal server error"
                        }
                    }
                }
            },

            '/user/login': {
                post: {
                    tags: ["users"],
                    summary: "login user",
                    description: "loging the user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {

                                        email: { type: "string", format: "email", example: "jayesh@gamil.com" },
                                        password: { type: "string", format: "password", example: "StrongPass@123" }
                                    },
                                    required: ["email", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "User login successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: { type: "string", example: "User created successfully" },
                                            name: { type: "string", example: "jayesh" },
                                            email: { type: "string", example: "jayesh@gmmail.com" },

                                            token: { type: "string", example: "json web token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpheWVzaDEyMTIyMEBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNjhjM2YyOGZjZTBjMmY2Nzg4NzIxM2NhIiwidXNlcm5hbWUiOiJKYXllc2giLCJpYXQiOjE3NTgyMTY1MzN9.dZfqpoczCzbbyYjc2LMnV4fRv4ZstSWUbbVAImGr2Sw" }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Validation error / Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: { type: "string", example: "Email /password is wrong/incorrect" }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Internal server error"
                        }
                    }
                }
            },
            // '/user/forget_password': {
            //     post: {
            //         tags: ["users"],
            //         summary: "login user",
            //         description: "loging the user",
            //         requestBody: {
            //             required: true,
            //             content: {
            //                 "application/json": {
            //                     schema: {
            //                         type: "object",
            //                         properties: {

            //                             email: { type: "string", format: "email", example: "jayesh@gamil.com" },
            //                             password: { type: "string", format: "password", example: "StrongPass@123" }
            //                         },
            //                         required: ["email", "password"]
            //                     }
            //                 }
            //             }
            //         },
            //         responses: {
            //             "201": {
            //                 description: "User login successfully",
            //                 content: {
            //                     "application/json": {
            //                         schema: {
            //                             type: "object",
            //                             properties: {
            //                                 message: { type: "string", example: "User created successfully" },
            //                                 name: { type: "string", example: "jayesh" },
            //                                 email: { type: "string", example: "jayesh@gmmail.com" },

            //                                 token: { type: "string", example: "json web token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpheWVzaDEyMTIyMEBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNjhjM2YyOGZjZTBjMmY2Nzg4NzIxM2NhIiwidXNlcm5hbWUiOiJKYXllc2giLCJpYXQiOjE3NTgyMTY1MzN9.dZfqpoczCzbbyYjc2LMnV4fRv4ZstSWUbbVAImGr2Sw" }
            //                             }
            //                         }
            //                     }
            //                 }
            //             },
            //             "400": {
            //                 description: "Validation error / Bad request",
            //                 content: {
            //                     "application/json": {
            //                         schema: {
            //                             type: "object",
            //                             properties: {
            //                                 error: { type: "string", example: "Email /password is wrong/incorrect" }
            //                             }
            //                         }
            //                     }
            //                 }
            //             },
            //             "500": {
            //                 description: "Internal server error"
            //             }
            //         }
            //     }
            // }




            // should be add the sqagger befor this
        }
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };