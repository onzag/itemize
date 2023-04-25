export default {
  "name": "itemize",
  "version": "0.0.1",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "@ampproject/remapping": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.1.2.tgz",
      "integrity": "sha512-hoyByceqwKirw7w3Z7gnIIZC3Wx3J484Y3L/cMpXFbr7d9ZQj2mODrirNzcJa+SM3UlpWXYvKV4RlRpFXlWgXg==",
      "dev": true,
      "requires": {
        "@jridgewell/trace-mapping": "^0.3.0"
      }
    },
    "@babel/code-frame": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.16.7.tgz",
      "integrity": "sha512-iAXqUn8IIeBTNd72xsFlgaXHkMBMt6y4HJp1tIaK465CWLT/fG1aqB7ykr95gHHmlBdGbFeWWfyB4NJJ0nmeIg==",
      "requires": {
        "@babel/highlight": "^7.16.7"
      }
    },
    "@babel/compat-data": {
      "version": "7.17.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.17.0.tgz",
      "integrity": "sha512-392byTlpGWXMv4FbyWw3sAZ/FrW/DrwqLGXpy0mbyNe9Taqv1mg9yON5/o0cnr8XYCkFTZbC1eV+c+LAROgrng==",
      "dev": true
    },
    "@babel/core": {
      "version": "7.17.5",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.17.5.tgz",
      "integrity": "sha512-/BBMw4EvjmyquN5O+t5eh0+YqB3XXJkYD2cjKpYtWOfFy4lQ4UozNSmxAcWT8r2XtZs0ewG+zrfsqeR15i1ajA==",
      "dev": true,
      "requires": {
        "@ampproject/remapping": "^2.1.0",
        "@babel/code-frame": "^7.16.7",
        "@babel/generator": "^7.17.3",
        "@babel/helper-compilation-targets": "^7.16.7",
        "@babel/helper-module-transforms": "^7.16.7",
        "@babel/helpers": "^7.17.2",
        "@babel/parser": "^7.17.3",
        "@babel/template": "^7.16.7",
        "@babel/traverse": "^7.17.3",
        "@babel/types": "^7.17.0",
        "convert-source-map": "^1.7.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.1.2",
        "semver": "^6.3.0"
      }
    },
    "@babel/generator": {
      "version": "7.17.3",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.17.3.tgz",
      "integrity": "sha512-+R6Dctil/MgUsZsZAkYgK+ADNSZzJRRy0TvY65T71z/CR854xHQ1EweBYXdfT+HNeN7w0cSJJEzgxZMv40pxsg==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.17.0",
        "jsesc": "^2.5.1",
        "source-map": "^0.5.0"
      }
    },
    "@babel/helper-annotate-as-pure": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.16.7.tgz",
      "integrity": "sha512-s6t2w/IPQVTAET1HitoowRGXooX8mCgtuP5195wD/QJPV6wYjpujCGF7JuMODVX2ZAJOf1GT6DT9MHEZvLOFSw==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-builder-binary-assignment-operator-visitor": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-builder-binary-assignment-operator-visitor/-/helper-builder-binary-assignment-operator-visitor-7.16.7.tgz",
      "integrity": "sha512-C6FdbRaxYjwVu/geKW4ZeQ0Q31AftgRcdSnZ5/jsH6BzCJbtvXvhpfkbkThYSuutZA7nCXpPR6AD9zd1dprMkA==",
      "dev": true,
      "requires": {
        "@babel/helper-explode-assignable-expression": "^7.16.7",
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-compilation-targets": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.16.7.tgz",
      "integrity": "sha512-mGojBwIWcwGD6rfqgRXVlVYmPAv7eOpIemUG3dGnDdCY4Pae70ROij3XmfrH6Fa1h1aiDylpglbZyktfzyo/hA==",
      "dev": true,
      "requires": {
        "@babel/compat-data": "^7.16.4",
        "@babel/helper-validator-option": "^7.16.7",
        "browserslist": "^4.17.5",
        "semver": "^6.3.0"
      }
    },
    "@babel/helper-create-class-features-plugin": {
      "version": "7.17.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.17.1.tgz",
      "integrity": "sha512-JBdSr/LtyYIno/pNnJ75lBcqc3Z1XXujzPanHqjvvrhOA+DTceTFuJi8XjmWTZh4r3fsdfqaCMN0iZemdkxZHQ==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "@babel/helper-environment-visitor": "^7.16.7",
        "@babel/helper-function-name": "^7.16.7",
        "@babel/helper-member-expression-to-functions": "^7.16.7",
        "@babel/helper-optimise-call-expression": "^7.16.7",
        "@babel/helper-replace-supers": "^7.16.7",
        "@babel/helper-split-export-declaration": "^7.16.7"
      }
    },
    "@babel/helper-create-regexp-features-plugin": {
      "version": "7.17.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-regexp-features-plugin/-/helper-create-regexp-features-plugin-7.17.0.tgz",
      "integrity": "sha512-awO2So99wG6KnlE+TPs6rn83gCz5WlEePJDTnLEqbchMVrBeAujURVphRdigsk094VhvZehFoNOihSlcBjwsXA==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "regexpu-core": "^5.0.1"
      }
    },
    "@babel/helper-define-polyfill-provider": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-define-polyfill-provider/-/helper-define-polyfill-provider-0.3.1.tgz",
      "integrity": "sha512-J9hGMpJQmtWmj46B3kBHmL38UhJGhYX7eqkcq+2gsstyYt341HmPeWspihX43yVRA0mS+8GGk2Gckc7bY/HCmA==",
      "dev": true,
      "requires": {
        "@babel/helper-compilation-targets": "^7.13.0",
        "@babel/helper-module-imports": "^7.12.13",
        "@babel/helper-plugin-utils": "^7.13.0",
        "@babel/traverse": "^7.13.0",
        "debug": "^4.1.1",
        "lodash.debounce": "^4.0.8",
        "resolve": "^1.14.2",
        "semver": "^6.1.2"
      }
    },
    "@babel/helper-environment-visitor": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-environment-visitor/-/helper-environment-visitor-7.16.7.tgz",
      "integrity": "sha512-SLLb0AAn6PkUeAfKJCCOl9e1R53pQlGAfc4y4XuMRZfqeMYLE0dM1LMhqbGAlGQY0lfw5/ohoYWAe9V1yibRag==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-explode-assignable-expression": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-explode-assignable-expression/-/helper-explode-assignable-expression-7.16.7.tgz",
      "integrity": "sha512-KyUenhWMC8VrxzkGP0Jizjo4/Zx+1nNZhgocs+gLzyZyB8SHidhoq9KK/8Ato4anhwsivfkBLftky7gvzbZMtQ==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-function-name": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-function-name/-/helper-function-name-7.16.7.tgz",
      "integrity": "sha512-QfDfEnIUyyBSR3HtrtGECuZ6DAyCkYFp7GHl75vFtTnn6pjKeK0T1DB5lLkFvBea8MdaiUABx3osbgLyInoejA==",
      "dev": true,
      "requires": {
        "@babel/helper-get-function-arity": "^7.16.7",
        "@babel/template": "^7.16.7",
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-get-function-arity": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-get-function-arity/-/helper-get-function-arity-7.16.7.tgz",
      "integrity": "sha512-flc+RLSOBXzNzVhcLu6ujeHUrD6tANAOU5ojrRx/as+tbzf8+stUCj7+IfRRoAbEZqj/ahXEMsjhOhgeZsrnTw==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-hoist-variables": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-hoist-variables/-/helper-hoist-variables-7.16.7.tgz",
      "integrity": "sha512-m04d/0Op34H5v7pbZw6pSKP7weA6lsMvfiIAMeIvkY/R4xQtBSMFEigu9QTZ2qB/9l22vsxtM8a+Q8CzD255fg==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-member-expression-to-functions": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.16.7.tgz",
      "integrity": "sha512-VtJ/65tYiU/6AbMTDwyoXGPKHgTsfRarivm+YbB5uAzKUyuPjgZSgAFeG87FCigc7KNHu2Pegh1XIT3lXjvz3Q==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-module-imports": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.16.7.tgz",
      "integrity": "sha512-LVtS6TqjJHFc+nYeITRo6VLXve70xmq7wPhWTqDJusJEgGmkAACWwMiTNrvfoQo6hEhFwAIixNkvB0jPXDL8Wg==",
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-module-transforms": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.16.7.tgz",
      "integrity": "sha512-gaqtLDxJEFCeQbYp9aLAefjhkKdjKcdh6DB7jniIGU3Pz52WAmP268zK0VgPz9hUNkMSYeH976K2/Y6yPadpng==",
      "dev": true,
      "requires": {
        "@babel/helper-environment-visitor": "^7.16.7",
        "@babel/helper-module-imports": "^7.16.7",
        "@babel/helper-simple-access": "^7.16.7",
        "@babel/helper-split-export-declaration": "^7.16.7",
        "@babel/helper-validator-identifier": "^7.16.7",
        "@babel/template": "^7.16.7",
        "@babel/traverse": "^7.16.7",
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-optimise-call-expression": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.16.7.tgz",
      "integrity": "sha512-EtgBhg7rd/JcnpZFXpBy0ze1YRfdm7BnBX4uKMBd3ixa3RGAE002JZB66FJyNH7g0F38U05pXmA5P8cBh7z+1w==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-plugin-utils": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.16.7.tgz",
      "integrity": "sha512-Qg3Nk7ZxpgMrsox6HreY1ZNKdBq7K72tDSliA6dCl5f007jR4ne8iD5UzuNnCJH2xBf2BEEVGr+/OL6Gdp7RxA=="
    },
    "@babel/helper-remap-async-to-generator": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.16.8.tgz",
      "integrity": "sha512-fm0gH7Flb8H51LqJHy3HJ3wnE1+qtYR2A99K06ahwrawLdOFsCEWjZOrYricXJHoPSudNKxrMBUPEIPxiIIvBw==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "@babel/helper-wrap-function": "^7.16.8",
        "@babel/types": "^7.16.8"
      }
    },
    "@babel/helper-replace-supers": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.16.7.tgz",
      "integrity": "sha512-y9vsWilTNaVnVh6xiJfABzsNpgDPKev9HnAgz6Gb1p6UUwf9NepdlsV7VXGCftJM+jqD5f7JIEubcpLjZj5dBw==",
      "dev": true,
      "requires": {
        "@babel/helper-environment-visitor": "^7.16.7",
        "@babel/helper-member-expression-to-functions": "^7.16.7",
        "@babel/helper-optimise-call-expression": "^7.16.7",
        "@babel/traverse": "^7.16.7",
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-simple-access": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.16.7.tgz",
      "integrity": "sha512-ZIzHVyoeLMvXMN/vok/a4LWRy8G2v205mNP0XOuf9XRLyX5/u9CnVulUtDgUTama3lT+bf/UqucuZjqiGuTS1g==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-skip-transparent-expression-wrappers": {
      "version": "7.16.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.16.0.tgz",
      "integrity": "sha512-+il1gTy0oHwUsBQZyJvukbB4vPMdcYBrFHa0Uc4AizLxbq6BOYC51Rv4tWocX9BLBDLZ4kc6qUFpQ6HRgL+3zw==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.0"
      }
    },
    "@babel/helper-split-export-declaration": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.16.7.tgz",
      "integrity": "sha512-xbWoy/PFoxSWazIToT9Sif+jJTlrMcndIsaOKvTA6u7QEo7ilkRZpjew18/W3c7nm8fXdUDXh02VXTbZ0pGDNw==",
      "dev": true,
      "requires": {
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/helper-validator-identifier": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.16.7.tgz",
      "integrity": "sha512-hsEnFemeiW4D08A5gUAZxLBTXpZ39P+a+DGDsHw1yxqyQ/jzFEnxf5uTEGp+3bzAbNOxU1paTgYS4ECU/IgfDw=="
    },
    "@babel/helper-validator-option": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.16.7.tgz",
      "integrity": "sha512-TRtenOuRUVo9oIQGPC5G9DgK4743cdxvtOw0weQNpZXaS16SCBi5MNjZF8vba3ETURjZpTbVn7Vvcf2eAwFozQ==",
      "dev": true
    },
    "@babel/helper-wrap-function": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.16.8.tgz",
      "integrity": "sha512-8RpyRVIAW1RcDDGTA+GpPAwV22wXCfKOoM9bet6TLkGIFTkRQSkH1nMQ5Yet4MpoXe1ZwHPVtNasc2w0uZMqnw==",
      "dev": true,
      "requires": {
        "@babel/helper-function-name": "^7.16.7",
        "@babel/template": "^7.16.7",
        "@babel/traverse": "^7.16.8",
        "@babel/types": "^7.16.8"
      }
    },
    "@babel/helpers": {
      "version": "7.17.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.17.2.tgz",
      "integrity": "sha512-0Qu7RLR1dILozr/6M0xgj+DFPmi6Bnulgm9M8BVa9ZCWxDqlSnqt3cf8IDPB5m45sVXUZ0kuQAgUrdSFFH79fQ==",
      "dev": true,
      "requires": {
        "@babel/template": "^7.16.7",
        "@babel/traverse": "^7.17.0",
        "@babel/types": "^7.17.0"
      }
    },
    "@babel/highlight": {
      "version": "7.16.10",
      "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.16.10.tgz",
      "integrity": "sha512-5FnTQLSLswEj6IkgVw5KusNUUFY9ZGqe/TRFnP/BKYHYgfh7tc+C7mwiy95/yNP7Dh9x580Vv8r7u7ZfTBFxdw==",
      "requires": {
        "@babel/helper-validator-identifier": "^7.16.7",
        "chalk": "^2.0.0",
        "js-tokens": "^4.0.0"
      }
    },
    "@babel/parser": {
      "version": "7.17.3",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.17.3.tgz",
      "integrity": "sha512-7yJPvPV+ESz2IUTPbOL+YkIGyCqOyNIzdguKQuJGnH7bg1WTIifuM21YqokFt/THWh1AkCRn9IgoykTRCBVpzA==",
      "dev": true
    },
    "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression/-/plugin-bugfix-safari-id-destructuring-collision-in-function-expression-7.16.7.tgz",
      "integrity": "sha512-anv/DObl7waiGEnC24O9zqL0pSuI9hljihqiDuFHC8d7/bjr/4RLGPWuc8rYOff/QPzbEPSkzG8wGG9aDuhHRg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining/-/plugin-bugfix-v8-spread-parameters-in-optional-chaining-7.16.7.tgz",
      "integrity": "sha512-di8vUHRdf+4aJ7ltXhaDbPoszdkh59AQtJM5soLsuHpQJdFQZOA4uGj0V2u/CZ8bJ/u8ULDL5yq6FO/bCXnKHw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.16.0",
        "@babel/plugin-proposal-optional-chaining": "^7.16.7"
      }
    },
    "@babel/plugin-proposal-async-generator-functions": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-async-generator-functions/-/plugin-proposal-async-generator-functions-7.16.8.tgz",
      "integrity": "sha512-71YHIvMuiuqWJQkebWJtdhQTfd4Q4mF76q2IX37uZPkG9+olBxsX+rH1vkhFto4UeJZ9dPY2s+mDvhDm1u2BGQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-remap-async-to-generator": "^7.16.8",
        "@babel/plugin-syntax-async-generators": "^7.8.4"
      }
    },
    "@babel/plugin-proposal-class-properties": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-class-properties/-/plugin-proposal-class-properties-7.16.7.tgz",
      "integrity": "sha512-IobU0Xme31ewjYOShSIqd/ZGM/r/cuOz2z0MDbNrhF5FW+ZVgi0f2lyeoj9KFPDOAqsYxmLWZte1WOwlvY9aww==",
      "dev": true,
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-proposal-class-static-block": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-class-static-block/-/plugin-proposal-class-static-block-7.16.7.tgz",
      "integrity": "sha512-dgqJJrcZoG/4CkMopzhPJjGxsIe9A8RlkQLnL/Vhhx8AA9ZuaRwGSlscSh42hazc7WSrya/IK7mTeoF0DP9tEw==",
      "dev": true,
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-class-static-block": "^7.14.5"
      }
    },
    "@babel/plugin-proposal-dynamic-import": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-dynamic-import/-/plugin-proposal-dynamic-import-7.16.7.tgz",
      "integrity": "sha512-I8SW9Ho3/8DRSdmDdH3gORdyUuYnk1m4cMxUAdu5oy4n3OfN8flDEH+d60iG7dUfi0KkYwSvoalHzzdRzpWHTg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-dynamic-import": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-export-namespace-from": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-export-namespace-from/-/plugin-proposal-export-namespace-from-7.16.7.tgz",
      "integrity": "sha512-ZxdtqDXLRGBL64ocZcs7ovt71L3jhC1RGSyR996svrCi3PYqHNkb3SwPJCs8RIzD86s+WPpt2S73+EHCGO+NUA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-export-namespace-from": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-json-strings": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-json-strings/-/plugin-proposal-json-strings-7.16.7.tgz",
      "integrity": "sha512-lNZ3EEggsGY78JavgbHsK9u5P3pQaW7k4axlgFLYkMd7UBsiNahCITShLjNQschPyjtO6dADrL24757IdhBrsQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-json-strings": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-logical-assignment-operators": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-logical-assignment-operators/-/plugin-proposal-logical-assignment-operators-7.16.7.tgz",
      "integrity": "sha512-K3XzyZJGQCr00+EtYtrDjmwX7o7PLK6U9bi1nCwkQioRFVUv6dJoxbQjtWVtP+bCPy82bONBKG8NPyQ4+i6yjg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-logical-assignment-operators": "^7.10.4"
      }
    },
    "@babel/plugin-proposal-nullish-coalescing-operator": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-nullish-coalescing-operator/-/plugin-proposal-nullish-coalescing-operator-7.16.7.tgz",
      "integrity": "sha512-aUOrYU3EVtjf62jQrCj63pYZ7k6vns2h/DQvHPWGmsJRYzWXZ6/AsfgpiRy6XiuIDADhJzP2Q9MwSMKauBQ+UQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-numeric-separator": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-numeric-separator/-/plugin-proposal-numeric-separator-7.16.7.tgz",
      "integrity": "sha512-vQgPMknOIgiuVqbokToyXbkY/OmmjAzr/0lhSIbG/KmnzXPGwW/AdhdKpi+O4X/VkWiWjnkKOBiqJrTaC98VKw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-numeric-separator": "^7.10.4"
      }
    },
    "@babel/plugin-proposal-object-rest-spread": {
      "version": "7.17.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-object-rest-spread/-/plugin-proposal-object-rest-spread-7.17.3.tgz",
      "integrity": "sha512-yuL5iQA/TbZn+RGAfxQXfi7CNLmKi1f8zInn4IgobuCWcAb7i+zj4TYzQ9l8cEzVyJ89PDGuqxK1xZpUDISesw==",
      "dev": true,
      "requires": {
        "@babel/compat-data": "^7.17.0",
        "@babel/helper-compilation-targets": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-object-rest-spread": "^7.8.3",
        "@babel/plugin-transform-parameters": "^7.16.7"
      }
    },
    "@babel/plugin-proposal-optional-catch-binding": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-catch-binding/-/plugin-proposal-optional-catch-binding-7.16.7.tgz",
      "integrity": "sha512-eMOH/L4OvWSZAE1VkHbr1vckLG1WUcHGJSLqqQwl2GaUqG6QjddvrOaTUMNYiv77H5IKPMZ9U9P7EaHwvAShfA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-optional-catch-binding": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-optional-chaining": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-chaining/-/plugin-proposal-optional-chaining-7.16.7.tgz",
      "integrity": "sha512-eC3xy+ZrUcBtP7x+sq62Q/HYd674pPTb/77XZMb5wbDPGWIdUbSr4Agr052+zaUPSb+gGRnjxXfKFvx5iMJ+DA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.16.0",
        "@babel/plugin-syntax-optional-chaining": "^7.8.3"
      }
    },
    "@babel/plugin-proposal-private-methods": {
      "version": "7.16.11",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-private-methods/-/plugin-proposal-private-methods-7.16.11.tgz",
      "integrity": "sha512-F/2uAkPlXDr8+BHpZvo19w3hLFKge+k75XUprE6jaqKxjGkSYcK+4c+bup5PdW/7W/Rpjwql7FTVEDW+fRAQsw==",
      "dev": true,
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.16.10",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-proposal-private-property-in-object": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-private-property-in-object/-/plugin-proposal-private-property-in-object-7.16.7.tgz",
      "integrity": "sha512-rMQkjcOFbm+ufe3bTZLyOfsOUOxyvLXZJCTARhJr+8UMSoZmqTe1K1BgkFcrW37rAchWg57yI69ORxiWvUINuQ==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "@babel/helper-create-class-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-private-property-in-object": "^7.14.5"
      }
    },
    "@babel/plugin-proposal-unicode-property-regex": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-unicode-property-regex/-/plugin-proposal-unicode-property-regex-7.16.7.tgz",
      "integrity": "sha512-QRK0YI/40VLhNVGIjRNAAQkEHws0cswSdFFjpFyt943YmJIU1da9uW63Iu6NFV6CxTZW5eTDCrwZUstBWgp/Rg==",
      "dev": true,
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-syntax-async-generators": {
      "version": "7.8.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-async-generators/-/plugin-syntax-async-generators-7.8.4.tgz",
      "integrity": "sha512-tycmZxkGfZaxhMRbXlPXuVFpdWlXpir2W4AMhSJgRKzk/eDlIXOhb2LHWoLpDF7TEHylV5zNhykX6KAgHJmTNw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-class-properties": {
      "version": "7.12.13",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-class-properties/-/plugin-syntax-class-properties-7.12.13.tgz",
      "integrity": "sha512-fm4idjKla0YahUNgFNLCB0qySdsoPiZP3iQE3rky0mBUtMZ23yDJ9SJdg6dXTSDnulOVqiF3Hgr9nbXvXTQZYA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.12.13"
      }
    },
    "@babel/plugin-syntax-class-static-block": {
      "version": "7.14.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-class-static-block/-/plugin-syntax-class-static-block-7.14.5.tgz",
      "integrity": "sha512-b+YyPmr6ldyNnM6sqYeMWE+bgJcJpO6yS4QD7ymxgH34GBPNDM/THBh8iunyvKIZztiwLH4CJZ0RxTk9emgpjw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.14.5"
      }
    },
    "@babel/plugin-syntax-dynamic-import": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-dynamic-import/-/plugin-syntax-dynamic-import-7.8.3.tgz",
      "integrity": "sha512-5gdGbFon+PszYzqs83S3E5mpi7/y/8M9eC90MRTZfduQOYW76ig6SOSPNe41IG5LoP3FGBn2N0RjVDSQiS94kQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-export-namespace-from": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-export-namespace-from/-/plugin-syntax-export-namespace-from-7.8.3.tgz",
      "integrity": "sha512-MXf5laXo6c1IbEbegDmzGPwGNTsHZmEy6QGznu5Sh2UCWvueywb2ee+CCE4zQiZstxU9BMoQO9i6zUFSY0Kj0Q==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.3"
      }
    },
    "@babel/plugin-syntax-json-strings": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-json-strings/-/plugin-syntax-json-strings-7.8.3.tgz",
      "integrity": "sha512-lY6kdGpWHvjoe2vk4WrAapEuBR69EMxZl+RoGRhrFGNYVK8mOPAW8VfbT/ZgrFbXlDNiiaxQnAtgVCZ6jv30EA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-jsx": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.16.7.tgz",
      "integrity": "sha512-Esxmk7YjA8QysKeT3VhTXvF6y77f/a91SIs4pWb4H2eWGQkCKFgQaG6hdoEVZtGsrAcb2K5BW66XsOErD4WU3Q==",
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-syntax-logical-assignment-operators": {
      "version": "7.10.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-logical-assignment-operators/-/plugin-syntax-logical-assignment-operators-7.10.4.tgz",
      "integrity": "sha512-d8waShlpFDinQ5MtvGU9xDAOzKH47+FFoney2baFIoMr952hKOLp1HR7VszoZvOsV/4+RRszNY7D17ba0te0ig==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.10.4"
      }
    },
    "@babel/plugin-syntax-nullish-coalescing-operator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-nullish-coalescing-operator/-/plugin-syntax-nullish-coalescing-operator-7.8.3.tgz",
      "integrity": "sha512-aSff4zPII1u2QD7y+F8oDsz19ew4IGEJg9SVW+bqwpwtfFleiQDMdzA/R+UlWDzfnHFCxxleFT0PMIrR36XLNQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-numeric-separator": {
      "version": "7.10.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-numeric-separator/-/plugin-syntax-numeric-separator-7.10.4.tgz",
      "integrity": "sha512-9H6YdfkcK/uOnY/K7/aA2xpzaAgkQn37yzWUMRK7OaPOqOpGS1+n0H5hxT9AUw9EsSjPW8SVyMJwYRtWs3X3ug==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.10.4"
      }
    },
    "@babel/plugin-syntax-object-rest-spread": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-object-rest-spread/-/plugin-syntax-object-rest-spread-7.8.3.tgz",
      "integrity": "sha512-XoqMijGZb9y3y2XskN+P1wUGiVwWZ5JmoDRwx5+3GmEplNyVM2s2Dg8ILFQm8rWM48orGy5YpI5Bl8U1y7ydlA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-optional-catch-binding": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-catch-binding/-/plugin-syntax-optional-catch-binding-7.8.3.tgz",
      "integrity": "sha512-6VPD0Pc1lpTqw0aKoeRTMiB+kWhAoT24PA+ksWSBrFtl5SIRVpZlwN3NNPQjehA2E/91FV3RjLWoVTglWcSV3Q==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-optional-chaining": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-chaining/-/plugin-syntax-optional-chaining-7.8.3.tgz",
      "integrity": "sha512-KoK9ErH1MBlCPxV0VANkXW2/dw4vlbGDrFgz8bmUsBGYkFRcbRwMh6cIJubdPrkxRwuGdtCk0v/wPTKbQgBjkg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.8.0"
      }
    },
    "@babel/plugin-syntax-private-property-in-object": {
      "version": "7.14.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-private-property-in-object/-/plugin-syntax-private-property-in-object-7.14.5.tgz",
      "integrity": "sha512-0wVnp9dxJ72ZUJDV27ZfbSj6iHLoytYZmh3rFcxNnvsJF3ktkzLDZPy/mA17HGsaQT3/DQsWYX1f1QGWkCoVUg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.14.5"
      }
    },
    "@babel/plugin-syntax-top-level-await": {
      "version": "7.14.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-top-level-await/-/plugin-syntax-top-level-await-7.14.5.tgz",
      "integrity": "sha512-hx++upLv5U1rgYfwe1xBQUhRmU41NEvpUvrp8jkrSCdvGSnM5/qdRMtylJ6PG5OFkBaHkbTAKTnd3/YyESRHFw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.14.5"
      }
    },
    "@babel/plugin-syntax-typescript": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.16.7.tgz",
      "integrity": "sha512-YhUIJHHGkqPgEcMYkPCKTyGUdoGKWtopIycQyjJH8OjvRgOYsXsaKehLVPScKJWAULPxMa4N1vCe6szREFlZ7A==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-arrow-functions": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-arrow-functions/-/plugin-transform-arrow-functions-7.16.7.tgz",
      "integrity": "sha512-9ffkFFMbvzTvv+7dTp/66xvZAWASuPD5Tl9LK3Z9vhOmANo6j94rik+5YMBt4CwHVMWLWpMsriIc2zsa3WW3xQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-async-to-generator": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-to-generator/-/plugin-transform-async-to-generator-7.16.8.tgz",
      "integrity": "sha512-MtmUmTJQHCnyJVrScNzNlofQJ3dLFuobYn3mwOTKHnSCMtbNsqvF71GQmJfFjdrXSsAA7iysFmYWw4bXZ20hOg==",
      "dev": true,
      "requires": {
        "@babel/helper-module-imports": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-remap-async-to-generator": "^7.16.8"
      }
    },
    "@babel/plugin-transform-block-scoped-functions": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoped-functions/-/plugin-transform-block-scoped-functions-7.16.7.tgz",
      "integrity": "sha512-JUuzlzmF40Z9cXyytcbZEZKckgrQzChbQJw/5PuEHYeqzCsvebDx0K0jWnIIVcmmDOAVctCgnYs0pMcrYj2zJg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-block-scoping": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoping/-/plugin-transform-block-scoping-7.16.7.tgz",
      "integrity": "sha512-ObZev2nxVAYA4bhyusELdo9hb3H+A56bxH3FZMbEImZFiEDYVHXQSJ1hQKFlDnlt8G9bBrCZ5ZpURZUrV4G5qQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-classes": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-classes/-/plugin-transform-classes-7.16.7.tgz",
      "integrity": "sha512-WY7og38SFAGYRe64BrjKf8OrE6ulEHtr5jEYaZMwox9KebgqPi67Zqz8K53EKk1fFEJgm96r32rkKZ3qA2nCWQ==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "@babel/helper-environment-visitor": "^7.16.7",
        "@babel/helper-function-name": "^7.16.7",
        "@babel/helper-optimise-call-expression": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-replace-supers": "^7.16.7",
        "@babel/helper-split-export-declaration": "^7.16.7",
        "globals": "^11.1.0"
      }
    },
    "@babel/plugin-transform-computed-properties": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-computed-properties/-/plugin-transform-computed-properties-7.16.7.tgz",
      "integrity": "sha512-gN72G9bcmenVILj//sv1zLNaPyYcOzUho2lIJBMh/iakJ9ygCo/hEF9cpGb61SCMEDxbbyBoVQxrt+bWKu5KGw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-destructuring": {
      "version": "7.17.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-destructuring/-/plugin-transform-destructuring-7.17.3.tgz",
      "integrity": "sha512-dDFzegDYKlPqa72xIlbmSkly5MluLoaC1JswABGktyt6NTXSBcUuse/kWE/wvKFWJHPETpi158qJZFS3JmykJg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-dotall-regex": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-dotall-regex/-/plugin-transform-dotall-regex-7.16.7.tgz",
      "integrity": "sha512-Lyttaao2SjZF6Pf4vk1dVKv8YypMpomAbygW+mU5cYP3S5cWTfCJjG8xV6CFdzGFlfWK81IjL9viiTvpb6G7gQ==",
      "dev": true,
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-duplicate-keys": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-keys/-/plugin-transform-duplicate-keys-7.16.7.tgz",
      "integrity": "sha512-03DvpbRfvWIXyK0/6QiR1KMTWeT6OcQ7tbhjrXyFS02kjuX/mu5Bvnh5SDSWHxyawit2g5aWhKwI86EE7GUnTw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-exponentiation-operator": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-exponentiation-operator/-/plugin-transform-exponentiation-operator-7.16.7.tgz",
      "integrity": "sha512-8UYLSlyLgRixQvlYH3J2ekXFHDFLQutdy7FfFAMm3CPZ6q9wHCwnUyiXpQCe3gVVnQlHc5nsuiEVziteRNTXEA==",
      "dev": true,
      "requires": {
        "@babel/helper-builder-binary-assignment-operator-visitor": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-for-of": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-for-of/-/plugin-transform-for-of-7.16.7.tgz",
      "integrity": "sha512-/QZm9W92Ptpw7sjI9Nx1mbcsWz33+l8kuMIQnDwgQBG5s3fAfQvkRjQ7NqXhtNcKOnPkdICmUHyCaWW06HCsqg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-function-name": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-function-name/-/plugin-transform-function-name-7.16.7.tgz",
      "integrity": "sha512-SU/C68YVwTRxqWj5kgsbKINakGag0KTgq9f2iZEXdStoAbOzLHEBRYzImmA6yFo8YZhJVflvXmIHUO7GWHmxxA==",
      "dev": true,
      "requires": {
        "@babel/helper-compilation-targets": "^7.16.7",
        "@babel/helper-function-name": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-literals": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-literals/-/plugin-transform-literals-7.16.7.tgz",
      "integrity": "sha512-6tH8RTpTWI0s2sV6uq3e/C9wPo4PTqqZps4uF0kzQ9/xPLFQtipynvmT1g/dOfEJ+0EQsHhkQ/zyRId8J2b8zQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-member-expression-literals": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-member-expression-literals/-/plugin-transform-member-expression-literals-7.16.7.tgz",
      "integrity": "sha512-mBruRMbktKQwbxaJof32LT9KLy2f3gH+27a5XSuXo6h7R3vqltl0PgZ80C8ZMKw98Bf8bqt6BEVi3svOh2PzMw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-modules-amd": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-amd/-/plugin-transform-modules-amd-7.16.7.tgz",
      "integrity": "sha512-KaaEtgBL7FKYwjJ/teH63oAmE3lP34N3kshz8mm4VMAw7U3PxjVwwUmxEFksbgsNUaO3wId9R2AVQYSEGRa2+g==",
      "dev": true,
      "requires": {
        "@babel/helper-module-transforms": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "babel-plugin-dynamic-import-node": "^2.3.3"
      }
    },
    "@babel/plugin-transform-modules-commonjs": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.16.8.tgz",
      "integrity": "sha512-oflKPvsLT2+uKQopesJt3ApiaIS2HW+hzHFcwRNtyDGieAeC/dIHZX8buJQ2J2X1rxGPy4eRcUijm3qcSPjYcA==",
      "dev": true,
      "requires": {
        "@babel/helper-module-transforms": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-simple-access": "^7.16.7",
        "babel-plugin-dynamic-import-node": "^2.3.3"
      }
    },
    "@babel/plugin-transform-modules-systemjs": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-systemjs/-/plugin-transform-modules-systemjs-7.16.7.tgz",
      "integrity": "sha512-DuK5E3k+QQmnOqBR9UkusByy5WZWGRxfzV529s9nPra1GE7olmxfqO2FHobEOYSPIjPBTr4p66YDcjQnt8cBmw==",
      "dev": true,
      "requires": {
        "@babel/helper-hoist-variables": "^7.16.7",
        "@babel/helper-module-transforms": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-validator-identifier": "^7.16.7",
        "babel-plugin-dynamic-import-node": "^2.3.3"
      }
    },
    "@babel/plugin-transform-modules-umd": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-umd/-/plugin-transform-modules-umd-7.16.7.tgz",
      "integrity": "sha512-EMh7uolsC8O4xhudF2F6wedbSHm1HHZ0C6aJ7K67zcDNidMzVcxWdGr+htW9n21klm+bOn+Rx4CBsAntZd3rEQ==",
      "dev": true,
      "requires": {
        "@babel/helper-module-transforms": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-named-capturing-groups-regex": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-named-capturing-groups-regex/-/plugin-transform-named-capturing-groups-regex-7.16.8.tgz",
      "integrity": "sha512-j3Jw+n5PvpmhRR+mrgIh04puSANCk/T/UA3m3P1MjJkhlK906+ApHhDIqBQDdOgL/r1UYpz4GNclTXxyZrYGSw==",
      "dev": true,
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.16.7"
      }
    },
    "@babel/plugin-transform-new-target": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-new-target/-/plugin-transform-new-target-7.16.7.tgz",
      "integrity": "sha512-xiLDzWNMfKoGOpc6t3U+etCE2yRnn3SM09BXqWPIZOBpL2gvVrBWUKnsJx0K/ADi5F5YC5f8APFfWrz25TdlGg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-object-super": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-super/-/plugin-transform-object-super-7.16.7.tgz",
      "integrity": "sha512-14J1feiQVWaGvRxj2WjyMuXS2jsBkgB3MdSN5HuC2G5nRspa5RK9COcs82Pwy5BuGcjb+fYaUj94mYcOj7rCvw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-replace-supers": "^7.16.7"
      }
    },
    "@babel/plugin-transform-parameters": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-parameters/-/plugin-transform-parameters-7.16.7.tgz",
      "integrity": "sha512-AT3MufQ7zZEhU2hwOA11axBnExW0Lszu4RL/tAlUJBuNoRak+wehQW8h6KcXOcgjY42fHtDxswuMhMjFEuv/aw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-property-literals": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-property-literals/-/plugin-transform-property-literals-7.16.7.tgz",
      "integrity": "sha512-z4FGr9NMGdoIl1RqavCqGG+ZuYjfZ/hkCIeuH6Do7tXmSm0ls11nYVSJqFEUOSJbDab5wC6lRE/w6YjVcr6Hqw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-react-display-name": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-display-name/-/plugin-transform-react-display-name-7.16.7.tgz",
      "integrity": "sha512-qgIg8BcZgd0G/Cz916D5+9kqX0c7nPZyXaP8R2tLNN5tkyIZdG5fEwBrxwplzSnjC1jvQmyMNVwUCZPcbGY7Pg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-react-jsx": {
      "version": "7.17.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx/-/plugin-transform-react-jsx-7.17.3.tgz",
      "integrity": "sha512-9tjBm4O07f7mzKSIlEmPdiE6ub7kfIe6Cd+w+oQebpATfTQMAgW+YOuWxogbKVTulA+MEO7byMeIUtQ1z+z+ZQ==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "@babel/helper-module-imports": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-jsx": "^7.16.7",
        "@babel/types": "^7.17.0"
      }
    },
    "@babel/plugin-transform-react-jsx-development": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-development/-/plugin-transform-react-jsx-development-7.16.7.tgz",
      "integrity": "sha512-RMvQWvpla+xy6MlBpPlrKZCMRs2AGiHOGHY3xRwl0pEeim348dDyxeH4xBsMPbIMhujeq7ihE702eM2Ew0Wo+A==",
      "dev": true,
      "requires": {
        "@babel/plugin-transform-react-jsx": "^7.16.7"
      }
    },
    "@babel/plugin-transform-react-pure-annotations": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-pure-annotations/-/plugin-transform-react-pure-annotations-7.16.7.tgz",
      "integrity": "sha512-hs71ToC97k3QWxswh2ElzMFABXHvGiJ01IB1TbYQDGeWRKWz/MPUTh5jGExdHvosYKpnJW5Pm3S4+TA3FyX+GA==",
      "dev": true,
      "requires": {
        "@babel/helper-annotate-as-pure": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-regenerator": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.16.7.tgz",
      "integrity": "sha512-mF7jOgGYCkSJagJ6XCujSQg+6xC1M77/03K2oBmVJWoFGNUtnVJO4WHKJk3dnPC8HCcj4xBQP1Egm8DWh3Pb3Q==",
      "dev": true,
      "requires": {
        "regenerator-transform": "^0.14.2"
      }
    },
    "@babel/plugin-transform-reserved-words": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-reserved-words/-/plugin-transform-reserved-words-7.16.7.tgz",
      "integrity": "sha512-KQzzDnZ9hWQBjwi5lpY5v9shmm6IVG0U9pB18zvMu2i4H90xpT4gmqwPYsn8rObiadYe2M0gmgsiOIF5A/2rtg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-shorthand-properties": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-shorthand-properties/-/plugin-transform-shorthand-properties-7.16.7.tgz",
      "integrity": "sha512-hah2+FEnoRoATdIb05IOXf+4GzXYTq75TVhIn1PewihbpyrNWUt2JbudKQOETWw6QpLe+AIUpJ5MVLYTQbeeUg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-spread": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.16.7.tgz",
      "integrity": "sha512-+pjJpgAngb53L0iaA5gU/1MLXJIfXcYepLgXB3esVRf4fqmj8f2cxM3/FKaHsZms08hFQJkFccEWuIpm429TXg==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.16.0"
      }
    },
    "@babel/plugin-transform-sticky-regex": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-sticky-regex/-/plugin-transform-sticky-regex-7.16.7.tgz",
      "integrity": "sha512-NJa0Bd/87QV5NZZzTuZG5BPJjLYadeSZ9fO6oOUoL4iQx+9EEuw/eEM92SrsT19Yc2jgB1u1hsjqDtH02c3Drw==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-template-literals": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.16.7.tgz",
      "integrity": "sha512-VwbkDDUeenlIjmfNeDX/V0aWrQH2QiVyJtwymVQSzItFDTpxfyJh3EVaQiS0rIN/CqbLGr0VcGmuwyTdZtdIsA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-typeof-symbol": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typeof-symbol/-/plugin-transform-typeof-symbol-7.16.7.tgz",
      "integrity": "sha512-p2rOixCKRJzpg9JB4gjnG4gjWkWa89ZoYUnl9snJ1cWIcTH/hvxZqfO+WjG6T8DRBpctEol5jw1O5rA8gkCokQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-typescript": {
      "version": "7.16.8",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.16.8.tgz",
      "integrity": "sha512-bHdQ9k7YpBDO2d0NVfkj51DpQcvwIzIusJ7mEUaMlbZq3Kt/U47j24inXZHQ5MDiYpCs+oZiwnXyKedE8+q7AQ==",
      "dev": true,
      "requires": {
        "@babel/helper-create-class-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/plugin-syntax-typescript": "^7.16.7"
      }
    },
    "@babel/plugin-transform-unicode-escapes": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-escapes/-/plugin-transform-unicode-escapes-7.16.7.tgz",
      "integrity": "sha512-TAV5IGahIz3yZ9/Hfv35TV2xEm+kaBDaZQCn2S/hG9/CZ0DktxJv9eKfPc7yYCvOYR4JGx1h8C+jcSOvgaaI/Q==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/plugin-transform-unicode-regex": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-regex/-/plugin-transform-unicode-regex-7.16.7.tgz",
      "integrity": "sha512-oC5tYYKw56HO75KZVLQ+R/Nl3Hro9kf8iG0hXoaHP7tjAyCpvqBiSNe6vGrZni1Z6MggmUOC6A7VP7AVmw225Q==",
      "dev": true,
      "requires": {
        "@babel/helper-create-regexp-features-plugin": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7"
      }
    },
    "@babel/preset-env": {
      "version": "7.16.11",
      "resolved": "https://registry.npmjs.org/@babel/preset-env/-/preset-env-7.16.11.tgz",
      "integrity": "sha512-qcmWG8R7ZW6WBRPZK//y+E3Cli151B20W1Rv7ln27vuPaXU/8TKms6jFdiJtF7UDTxcrb7mZd88tAeK9LjdT8g==",
      "dev": true,
      "requires": {
        "@babel/compat-data": "^7.16.8",
        "@babel/helper-compilation-targets": "^7.16.7",
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-validator-option": "^7.16.7",
        "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression": "^7.16.7",
        "@babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining": "^7.16.7",
        "@babel/plugin-proposal-async-generator-functions": "^7.16.8",
        "@babel/plugin-proposal-class-properties": "^7.16.7",
        "@babel/plugin-proposal-class-static-block": "^7.16.7",
        "@babel/plugin-proposal-dynamic-import": "^7.16.7",
        "@babel/plugin-proposal-export-namespace-from": "^7.16.7",
        "@babel/plugin-proposal-json-strings": "^7.16.7",
        "@babel/plugin-proposal-logical-assignment-operators": "^7.16.7",
        "@babel/plugin-proposal-nullish-coalescing-operator": "^7.16.7",
        "@babel/plugin-proposal-numeric-separator": "^7.16.7",
        "@babel/plugin-proposal-object-rest-spread": "^7.16.7",
        "@babel/plugin-proposal-optional-catch-binding": "^7.16.7",
        "@babel/plugin-proposal-optional-chaining": "^7.16.7",
        "@babel/plugin-proposal-private-methods": "^7.16.11",
        "@babel/plugin-proposal-private-property-in-object": "^7.16.7",
        "@babel/plugin-proposal-unicode-property-regex": "^7.16.7",
        "@babel/plugin-syntax-async-generators": "^7.8.4",
        "@babel/plugin-syntax-class-properties": "^7.12.13",
        "@babel/plugin-syntax-class-static-block": "^7.14.5",
        "@babel/plugin-syntax-dynamic-import": "^7.8.3",
        "@babel/plugin-syntax-export-namespace-from": "^7.8.3",
        "@babel/plugin-syntax-json-strings": "^7.8.3",
        "@babel/plugin-syntax-logical-assignment-operators": "^7.10.4",
        "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.3",
        "@babel/plugin-syntax-numeric-separator": "^7.10.4",
        "@babel/plugin-syntax-object-rest-spread": "^7.8.3",
        "@babel/plugin-syntax-optional-catch-binding": "^7.8.3",
        "@babel/plugin-syntax-optional-chaining": "^7.8.3",
        "@babel/plugin-syntax-private-property-in-object": "^7.14.5",
        "@babel/plugin-syntax-top-level-await": "^7.14.5",
        "@babel/plugin-transform-arrow-functions": "^7.16.7",
        "@babel/plugin-transform-async-to-generator": "^7.16.8",
        "@babel/plugin-transform-block-scoped-functions": "^7.16.7",
        "@babel/plugin-transform-block-scoping": "^7.16.7",
        "@babel/plugin-transform-classes": "^7.16.7",
        "@babel/plugin-transform-computed-properties": "^7.16.7",
        "@babel/plugin-transform-destructuring": "^7.16.7",
        "@babel/plugin-transform-dotall-regex": "^7.16.7",
        "@babel/plugin-transform-duplicate-keys": "^7.16.7",
        "@babel/plugin-transform-exponentiation-operator": "^7.16.7",
        "@babel/plugin-transform-for-of": "^7.16.7",
        "@babel/plugin-transform-function-name": "^7.16.7",
        "@babel/plugin-transform-literals": "^7.16.7",
        "@babel/plugin-transform-member-expression-literals": "^7.16.7",
        "@babel/plugin-transform-modules-amd": "^7.16.7",
        "@babel/plugin-transform-modules-commonjs": "^7.16.8",
        "@babel/plugin-transform-modules-systemjs": "^7.16.7",
        "@babel/plugin-transform-modules-umd": "^7.16.7",
        "@babel/plugin-transform-named-capturing-groups-regex": "^7.16.8",
        "@babel/plugin-transform-new-target": "^7.16.7",
        "@babel/plugin-transform-object-super": "^7.16.7",
        "@babel/plugin-transform-parameters": "^7.16.7",
        "@babel/plugin-transform-property-literals": "^7.16.7",
        "@babel/plugin-transform-regenerator": "^7.16.7",
        "@babel/plugin-transform-reserved-words": "^7.16.7",
        "@babel/plugin-transform-shorthand-properties": "^7.16.7",
        "@babel/plugin-transform-spread": "^7.16.7",
        "@babel/plugin-transform-sticky-regex": "^7.16.7",
        "@babel/plugin-transform-template-literals": "^7.16.7",
        "@babel/plugin-transform-typeof-symbol": "^7.16.7",
        "@babel/plugin-transform-unicode-escapes": "^7.16.7",
        "@babel/plugin-transform-unicode-regex": "^7.16.7",
        "@babel/preset-modules": "^0.1.5",
        "@babel/types": "^7.16.8",
        "babel-plugin-polyfill-corejs2": "^0.3.0",
        "babel-plugin-polyfill-corejs3": "^0.5.0",
        "babel-plugin-polyfill-regenerator": "^0.3.0",
        "core-js-compat": "^3.20.2",
        "semver": "^6.3.0"
      }
    },
    "@babel/preset-modules": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/@babel/preset-modules/-/preset-modules-0.1.5.tgz",
      "integrity": "sha512-A57th6YRG7oR3cq/yt/Y84MvGgE0eJG2F1JLhKuyG+jFxEgrd/HAMJatiFtmOiZurz+0DkrvbheCLaV5f2JfjA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@babel/plugin-proposal-unicode-property-regex": "^7.4.4",
        "@babel/plugin-transform-dotall-regex": "^7.4.4",
        "@babel/types": "^7.4.4",
        "esutils": "^2.0.2"
      }
    },
    "@babel/preset-react": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/preset-react/-/preset-react-7.16.7.tgz",
      "integrity": "sha512-fWpyI8UM/HE6DfPBzD8LnhQ/OcH8AgTaqcqP2nGOXEUV+VKBR5JRN9hCk9ai+zQQ57vtm9oWeXguBCPNUjytgA==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-validator-option": "^7.16.7",
        "@babel/plugin-transform-react-display-name": "^7.16.7",
        "@babel/plugin-transform-react-jsx": "^7.16.7",
        "@babel/plugin-transform-react-jsx-development": "^7.16.7",
        "@babel/plugin-transform-react-pure-annotations": "^7.16.7"
      }
    },
    "@babel/preset-typescript": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.16.7.tgz",
      "integrity": "sha512-WbVEmgXdIyvzB77AQjGBEyYPZx+8tTsO50XtfozQrkW8QB2rLJpH2lgx0TRw5EJrBxOZQ+wCcyPVQvS8tjEHpQ==",
      "dev": true,
      "requires": {
        "@babel/helper-plugin-utils": "^7.16.7",
        "@babel/helper-validator-option": "^7.16.7",
        "@babel/plugin-transform-typescript": "^7.16.7"
      }
    },
    "@babel/runtime": {
      "version": "7.17.2",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.17.2.tgz",
      "integrity": "sha512-hzeyJyMA1YGdJTuWU0e/j4wKXrU4OMFvY2MSlaI9B7VQb0r5cxTE3EAIS2Q7Tn2RIcDkRvTA/v2JsAEhxe99uw==",
      "requires": {
        "regenerator-runtime": "^0.13.4"
      }
    },
    "@babel/template": {
      "version": "7.16.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.16.7.tgz",
      "integrity": "sha512-I8j/x8kHUrbYRTUxXrrMbfCa7jxkE7tZre39x3kjr9hvI82cK1FfqLygotcWN5kdPGWcLdWMHpSBavse5tWw3w==",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.16.7",
        "@babel/parser": "^7.16.7",
        "@babel/types": "^7.16.7"
      }
    },
    "@babel/traverse": {
      "version": "7.17.3",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.17.3.tgz",
      "integrity": "sha512-5irClVky7TxRWIRtxlh2WPUUOLhcPN06AGgaQSB8AEwuyEBgJVuJ5imdHm5zxk8w0QS5T+tDfnDxAlhWjpb7cw==",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.16.7",
        "@babel/generator": "^7.17.3",
        "@babel/helper-environment-visitor": "^7.16.7",
        "@babel/helper-function-name": "^7.16.7",
        "@babel/helper-hoist-variables": "^7.16.7",
        "@babel/helper-split-export-declaration": "^7.16.7",
        "@babel/parser": "^7.17.3",
        "@babel/types": "^7.17.0",
        "debug": "^4.1.0",
        "globals": "^11.1.0"
      }
    },
    "@babel/types": {
      "version": "7.17.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.17.0.tgz",
      "integrity": "sha512-TmKSNO4D5rzhL5bjWFcVHHLETzfQ/AmbKpKPOSjlP0WoHZ6L911fgoOKY4Alp/emzG4cHJdyN49zpgkbXFEHHw==",
      "requires": {
        "@babel/helper-validator-identifier": "^7.16.7",
        "to-fast-properties": "^2.0.0"
      }
    },
    "@colors/colors": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/@colors/colors/-/colors-1.5.0.tgz",
      "integrity": "sha512-ooWCrlZP11i8GImSjTHYHLkvFDP48nS4+204nGb1RiX/WXYHmJA2III9/e2DWVabCESdW7hBAEzHRqUn9OUVvQ=="
    },
    "@dabh/diagnostics": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/@dabh/diagnostics/-/diagnostics-2.0.3.tgz",
      "integrity": "sha512-hrlQOIi7hAfzsMqlGSFyVucrx38O+j6wiGOf//H2ecvIEqYN4ADBSS2iLMh5UFyDunCNniUIPk/q3riFv45xRA==",
      "requires": {
        "colorspace": "1.1.x",
        "enabled": "2.0.x",
        "kuler": "^2.0.0"
      }
    },
    "@date-io/core": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/@date-io/core/-/core-2.13.1.tgz",
      "integrity": "sha512-pVI9nfkf2qClb2Cxdq0Q4zJhdawMG4ybWZUVGifT78FDwzRMX2SwXBb55s5NRJk0HcIicDuxktmCtemZqMH1Zg=="
    },
    "@date-io/date-fns": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/@date-io/date-fns/-/date-fns-2.13.1.tgz",
      "integrity": "sha512-8fmfwjiLMpFLD+t4NBwDx0eblWnNcgt4NgfT/uiiQTGI81fnPu9tpBMYdAcuWxaV7LLpXgzLBx1SYWAMDVUDQQ==",
      "requires": {
        "@date-io/core": "^2.13.1"
      }
    },
    "@date-io/dayjs": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/@date-io/dayjs/-/dayjs-2.13.1.tgz",
      "integrity": "sha512-5bL4WWWmlI4uGZVScANhHJV7Mjp93ec2gNeUHDqqLaMZhp51S0NgD25oqj/k0LqBn1cdU2MvzNpk/ObMmVv5cQ==",
      "requires": {
        "@date-io/core": "^2.13.1"
      }
    },
    "@date-io/luxon": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/@date-io/luxon/-/luxon-2.13.1.tgz",
      "integrity": "sha512-yG+uM7lXfwLyKKEwjvP8oZ7qblpmfl9gxQYae55ifbwiTs0CoCTkYkxEaQHGkYtTqGTzLqcb0O9Pzx6vgWg+yg==",
      "requires": {
        "@date-io/core": "^2.13.1"
      }
    },
    "@date-io/moment": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/@date-io/moment/-/moment-2.13.1.tgz",
      "integrity": "sha512-XX1X/Tlvl3TdqQy2j0ZUtEJV6Rl8tOyc5WOS3ki52He28Uzme4Ro/JuPWTMBDH63weSWIZDlbR7zBgp3ZA2y1A==",
      "requires": {
        "@date-io/core": "^2.13.1"
      }
    },
    "@elastic/elasticsearch": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/@elastic/elasticsearch/-/elasticsearch-8.1.0.tgz",
      "integrity": "sha512-IiZ6u77C7oYYbUkx/YFgEJk6ZtP+QDI97VaUWiYD14xIdn/w9WJtmx/Y1sN8ov0nZzrWbqScB2Z7Pb8oxo7vqw==",
      "requires": {
        "@elastic/transport": "^8.0.2",
        "tslib": "^2.3.0"
      }
    },
    "@elastic/transport": {
      "version": "8.3.1",
      "resolved": "https://registry.npmjs.org/@elastic/transport/-/transport-8.3.1.tgz",
      "integrity": "sha512-jv/Yp2VLvv5tSMEOF8iGrtL2YsYHbpf4s+nDsItxUTLFTzuJGpnsB/xBlfsoT2kAYEnWHiSJuqrbRcpXEI/SEQ==",
      "requires": {
        "debug": "^4.3.4",
        "hpagent": "^1.0.0",
        "ms": "^2.1.3",
        "secure-json-parse": "^2.4.0",
        "tslib": "^2.4.0",
        "undici": "^5.5.1"
      },
      "dependencies": {
        "debug": {
          "version": "4.3.4",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.4.tgz",
          "integrity": "sha512-PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==",
          "requires": {
            "ms": "2.1.2"
          },
          "dependencies": {
            "ms": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
              "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
            }
          }
        },
        "ms": {
          "version": "2.1.3",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
          "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="
        }
      }
    },
    "@emotion/babel-plugin": {
      "version": "11.7.2",
      "resolved": "https://registry.npmjs.org/@emotion/babel-plugin/-/babel-plugin-11.7.2.tgz",
      "integrity": "sha512-6mGSCWi9UzXut/ZAN6lGFu33wGR3SJisNl3c0tvlmb8XChH1b2SUvxvnOh7hvLpqyRdHHU9AiazV3Cwbk5SXKQ==",
      "requires": {
        "@babel/helper-module-imports": "^7.12.13",
        "@babel/plugin-syntax-jsx": "^7.12.13",
        "@babel/runtime": "^7.13.10",
        "@emotion/hash": "^0.8.0",
        "@emotion/memoize": "^0.7.5",
        "@emotion/serialize": "^1.0.2",
        "babel-plugin-macros": "^2.6.1",
        "convert-source-map": "^1.5.0",
        "escape-string-regexp": "^4.0.0",
        "find-root": "^1.1.0",
        "source-map": "^0.5.7",
        "stylis": "4.0.13"
      }
    },
    "@emotion/cache": {
      "version": "11.7.1",
      "resolved": "https://registry.npmjs.org/@emotion/cache/-/cache-11.7.1.tgz",
      "integrity": "sha512-r65Zy4Iljb8oyjtLeCuBH8Qjiy107dOYC6SJq7g7GV5UCQWMObY4SJDPGFjiiVpPrOJ2hmJOoBiYTC7hwx9E2A==",
      "requires": {
        "@emotion/memoize": "^0.7.4",
        "@emotion/sheet": "^1.1.0",
        "@emotion/utils": "^1.0.0",
        "@emotion/weak-memoize": "^0.2.5",
        "stylis": "4.0.13"
      }
    },
    "@emotion/css": {
      "version": "11.7.1",
      "resolved": "https://registry.npmjs.org/@emotion/css/-/css-11.7.1.tgz",
      "integrity": "sha512-RUUgPlMZunlc7SE5A6Hg+VWRzb2cU6O9xlV78KCFgcnl25s7Qz/20oQg71iKudpLqk7xj0vhbJlwcJJMT0BOZg==",
      "requires": {
        "@emotion/babel-plugin": "^11.7.1",
        "@emotion/cache": "^11.7.1",
        "@emotion/serialize": "^1.0.0",
        "@emotion/sheet": "^1.0.3",
        "@emotion/utils": "^1.0.0"
      }
    },
    "@emotion/hash": {
      "version": "0.8.0",
      "resolved": "https://registry.npmjs.org/@emotion/hash/-/hash-0.8.0.tgz",
      "integrity": "sha512-kBJtf7PH6aWwZ6fka3zQ0p6SBYzx4fl1LoZXE2RrnYST9Xljm7WfKJrU4g/Xr3Beg72MLrp1AWNUmuYJTL7Cow=="
    },
    "@emotion/is-prop-valid": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@emotion/is-prop-valid/-/is-prop-valid-1.1.2.tgz",
      "integrity": "sha512-3QnhqeL+WW88YjYbQL5gUIkthuMw7a0NGbZ7wfFVk2kg/CK5w8w5FFa0RzWjyY1+sujN0NWbtSHH6OJmWHtJpQ==",
      "requires": {
        "@emotion/memoize": "^0.7.4"
      }
    },
    "@emotion/memoize": {
      "version": "0.7.5",
      "resolved": "https://registry.npmjs.org/@emotion/memoize/-/memoize-0.7.5.tgz",
      "integrity": "sha512-igX9a37DR2ZPGYtV6suZ6whr8pTFtyHL3K/oLUotxpSVO2ASaprmAe2Dkq7tBo7CRY7MMDrAa9nuQP9/YG8FxQ=="
    },
    "@emotion/react": {
      "version": "11.8.1",
      "resolved": "https://registry.npmjs.org/@emotion/react/-/react-11.8.1.tgz",
      "integrity": "sha512-XGaie4nRxmtP1BZYBXqC5JGqMYF2KRKKI7vjqNvQxyRpekVAZhb6QqrElmZCAYXH1L90lAelADSVZC4PFsrJ8Q==",
      "requires": {
        "@babel/runtime": "^7.13.10",
        "@emotion/babel-plugin": "^11.7.1",
        "@emotion/cache": "^11.7.1",
        "@emotion/serialize": "^1.0.2",
        "@emotion/sheet": "^1.1.0",
        "@emotion/utils": "^1.1.0",
        "@emotion/weak-memoize": "^0.2.5",
        "hoist-non-react-statics": "^3.3.1"
      }
    },
    "@emotion/serialize": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@emotion/serialize/-/serialize-1.0.2.tgz",
      "integrity": "sha512-95MgNJ9+/ajxU7QIAruiOAdYNjxZX7G2mhgrtDWswA21VviYIRP1R5QilZ/bDY42xiKsaktP4egJb3QdYQZi1A==",
      "requires": {
        "@emotion/hash": "^0.8.0",
        "@emotion/memoize": "^0.7.4",
        "@emotion/unitless": "^0.7.5",
        "@emotion/utils": "^1.0.0",
        "csstype": "^3.0.2"
      }
    },
    "@emotion/server": {
      "version": "11.4.0",
      "resolved": "https://registry.npmjs.org/@emotion/server/-/server-11.4.0.tgz",
      "integrity": "sha512-IHovdWA3V0DokzxLtUNDx4+hQI82zUXqQFcVz/om2t44O0YSc+NHB+qifnyAOoQwt3SXcBTgaSntobwUI9gnfA==",
      "requires": {
        "@emotion/utils": "^1.0.0",
        "html-tokenize": "^2.0.0",
        "multipipe": "^1.0.2",
        "through": "^2.3.8"
      }
    },
    "@emotion/sheet": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@emotion/sheet/-/sheet-1.1.0.tgz",
      "integrity": "sha512-u0AX4aSo25sMAygCuQTzS+HsImZFuS8llY8O7b9MDRzbJM0kVJlAz6KNDqcG7pOuQZJmj/8X/rAW+66kMnMW+g=="
    },
    "@emotion/styled": {
      "version": "11.8.1",
      "resolved": "https://registry.npmjs.org/@emotion/styled/-/styled-11.8.1.tgz",
      "integrity": "sha512-OghEVAYBZMpEquHZwuelXcRjRJQOVayvbmNR0zr174NHdmMgrNkLC6TljKC5h9lZLkN5WGrdUcrKlOJ4phhoTQ==",
      "requires": {
        "@babel/runtime": "^7.13.10",
        "@emotion/babel-plugin": "^11.7.1",
        "@emotion/is-prop-valid": "^1.1.2",
        "@emotion/serialize": "^1.0.2",
        "@emotion/utils": "^1.1.0"
      }
    },
    "@emotion/unitless": {
      "version": "0.7.5",
      "resolved": "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.7.5.tgz",
      "integrity": "sha512-OWORNpfjMsSSUBVrRBVGECkhWcULOAJz9ZW8uK9qgxD+87M7jHRcvh/A96XXNhXTLmKcoYSQtBEX7lHMO7YRwg=="
    },
    "@emotion/utils": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@emotion/utils/-/utils-1.1.0.tgz",
      "integrity": "sha512-iRLa/Y4Rs5H/f2nimczYmS5kFJEbpiVvgN3XVfZ022IYhuNA1IRSHEizcof88LtCTXtl9S2Cxt32KgaXEu72JQ=="
    },
    "@emotion/weak-memoize": {
      "version": "0.2.5",
      "resolved": "https://registry.npmjs.org/@emotion/weak-memoize/-/weak-memoize-0.2.5.tgz",
      "integrity": "sha512-6U71C2Wp7r5XtFtQzYrW5iKFT67OixrSxjI4MptCHzdSVlgabczzqLe0ZSgnub/5Kp4hSbpDB1tMytZY9pwxxA=="
    },
    "@google-cloud/common": {
      "version": "0.32.1",
      "resolved": "https://registry.npmjs.org/@google-cloud/common/-/common-0.32.1.tgz",
      "integrity": "sha512-bLdPzFvvBMtVkwsoBtygE9oUm3yrNmPa71gvOgucYI/GqvNP2tb6RYsDHPq98kvignhcgHGDI5wyNgxaCo8bKQ==",
      "requires": {
        "@google-cloud/projectify": "^0.3.3",
        "@google-cloud/promisify": "^0.4.0",
        "@types/request": "^2.48.1",
        "arrify": "^2.0.0",
        "duplexify": "^3.6.0",
        "ent": "^2.2.0",
        "extend": "^3.0.2",
        "google-auth-library": "^3.1.1",
        "pify": "^4.0.1",
        "retry-request": "^4.0.0",
        "teeny-request": "^3.11.3"
      },
      "dependencies": {
        "arrify": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/arrify/-/arrify-2.0.1.tgz",
          "integrity": "sha512-3duEwti880xqi4eAMN8AyR4a0ByT90zoYdLlevfrvU43vb0YZwZVfxOgxWrLXXXpyugL0hNZc9G6BiB5B3nUug=="
        }
      }
    },
    "@google-cloud/paginator": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/@google-cloud/paginator/-/paginator-0.2.0.tgz",
      "integrity": "sha512-2ZSARojHDhkLvQ+CS32K+iUhBsWg3AEw+uxtqblA7xoCABDyhpj99FPp35xy6A+XlzMhOSrHHaxFE+t6ZTQq0w==",
      "requires": {
        "arrify": "^1.0.1",
        "extend": "^3.0.1",
        "split-array-stream": "^2.0.0",
        "stream-events": "^1.0.4"
      }
    },
    "@google-cloud/projectify": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/@google-cloud/projectify/-/projectify-0.3.3.tgz",
      "integrity": "sha512-7522YHQ4IhaafgSunsFF15nG0TGVmxgXidy9cITMe+256RgqfcrfWphiMufW+Ou4kqagW/u3yxwbzVEW3dk2Uw=="
    },
    "@google-cloud/promisify": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@google-cloud/promisify/-/promisify-0.4.0.tgz",
      "integrity": "sha512-4yAHDC52TEMCNcMzVC8WlqnKKKq+Ssi2lXoUg9zWWkZ6U6tq9ZBRYLHHCRdfU+EU9YJsVmivwGcKYCjRGjnf4Q=="
    },
    "@google-cloud/storage": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/@google-cloud/storage/-/storage-2.5.0.tgz",
      "integrity": "sha512-q1mwB6RUebIahbA3eriRs8DbG2Ij81Ynb9k8hMqTPkmbd8/S6Z0d6hVvfPmnyvX9Ej13IcmEYIbymuq/RBLghA==",
      "requires": {
        "@google-cloud/common": "^0.32.0",
        "@google-cloud/paginator": "^0.2.0",
        "@google-cloud/promisify": "^0.4.0",
        "arrify": "^1.0.0",
        "async": "^2.0.1",
        "compressible": "^2.0.12",
        "concat-stream": "^2.0.0",
        "date-and-time": "^0.6.3",
        "duplexify": "^3.5.0",
        "extend": "^3.0.0",
        "gcs-resumable-upload": "^1.0.0",
        "hash-stream-validation": "^0.2.1",
        "mime": "^2.2.0",
        "mime-types": "^2.0.8",
        "onetime": "^5.1.0",
        "pumpify": "^1.5.1",
        "snakeize": "^0.1.0",
        "stream-events": "^1.0.1",
        "teeny-request": "^3.11.3",
        "through2": "^3.0.0",
        "xdg-basedir": "^3.0.0"
      },
      "dependencies": {
        "through2": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/through2/-/through2-3.0.2.tgz",
          "integrity": "sha512-enaDQ4MUyP2W6ZyT6EsMzqBPZaM/avg8iuo+l2d3QCs0J+6RaqkHV/2/lOwDTueBHeJ/2LG9lrLW3d5rWPucuQ==",
          "requires": {
            "inherits": "^2.0.4",
            "readable-stream": "2 || 3"
          }
        }
      }
    },
    "@jridgewell/resolve-uri": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.0.5.tgz",
      "integrity": "sha512-VPeQ7+wH0itvQxnG+lIzWgkysKIr3L9sslimFW55rHMdGu/qCQ5z5h9zq4gI8uBtqkpHhsF4Z/OwExufUCThew==",
      "dev": true
    },
    "@jridgewell/sourcemap-codec": {
      "version": "1.4.11",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.11.tgz",
      "integrity": "sha512-Fg32GrJo61m+VqYSdRSjRXMjQ06j8YIYfcTqndLYVAaHmroZHLJZCydsWBOTDqXS2v+mjxohBWEMfg97GXmYQg==",
      "dev": true
    },
    "@jridgewell/trace-mapping": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.4.tgz",
      "integrity": "sha512-vFv9ttIedivx0ux3QSjhgtCVjPZd5l46ZOMDSCwnH1yUO2e964gO8LZGyv2QkqcgR6TnBU1v+1IFqmeoG+0UJQ==",
      "dev": true,
      "requires": {
        "@jridgewell/resolve-uri": "^3.0.3",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "@juggle/resize-observer": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/@juggle/resize-observer/-/resize-observer-3.4.0.tgz",
      "integrity": "sha512-dfLbk+PwWvFzSxwk3n5ySL0hfBog779o8h68wK/7/APo/7cgyWp5jcXockbxdk5kFRkbeXWm4Fbi9FrdN381sA=="
    },
    "@mapbox/node-pre-gyp": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/@mapbox/node-pre-gyp/-/node-pre-gyp-1.0.10.tgz",
      "integrity": "sha512-4ySo4CjzStuprMwk35H5pPbkymjv1SF3jGLj6rAHp/xT/RF7TL7bd9CTm1xDY49K2qF7jmR/g7k+SkLETP6opA==",
      "requires": {
        "detect-libc": "^2.0.0",
        "https-proxy-agent": "^5.0.0",
        "make-dir": "^3.1.0",
        "node-fetch": "^2.6.7",
        "nopt": "^5.0.0",
        "npmlog": "^5.0.1",
        "rimraf": "^3.0.2",
        "semver": "^7.3.5",
        "tar": "^6.1.11"
      },
      "dependencies": {
        "lru-cache": {
          "version": "6.0.0",
          "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
          "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
          "requires": {
            "yallist": "^4.0.0"
          }
        },
        "semver": {
          "version": "7.5.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-7.5.0.tgz",
          "integrity": "sha512-+XC0AD/R7Q2mPSRuy2Id0+CGTZ98+8f+KvwirxOKIEyid+XSx6HbC63p+O4IndTHuX5Z+JxQ0TghCkO5Cg/2HA==",
          "requires": {
            "lru-cache": "^6.0.0"
          }
        },
        "yallist": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
          "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
        }
      }
    },
    "@mui/base": {
      "version": "5.0.0-alpha.69",
      "resolved": "https://registry.npmjs.org/@mui/base/-/base-5.0.0-alpha.69.tgz",
      "integrity": "sha512-IxUUj/lkilCTNBIybQxyQGW/zpxFp490G0QBQJgRp9TJkW2PWSTLvAH7gcH0YHd0L2TAf1TRgfdemoRseMzqQA==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@emotion/is-prop-valid": "^1.1.1",
        "@mui/utils": "^5.4.2",
        "@popperjs/core": "^2.4.4",
        "clsx": "^1.1.1",
        "prop-types": "^15.7.2",
        "react-is": "^17.0.2"
      }
    },
    "@mui/icons-material": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/icons-material/-/icons-material-5.4.2.tgz",
      "integrity": "sha512-7c+G3jBT+e+pN0a9DJ0Bd8Kr1Vy6os5Q1yd2aXcwuhlRI3uzJBLJ8sX6FSWoh5DSEBchb7Bsk1uHz6U0YN9l+Q==",
      "requires": {
        "@babel/runtime": "^7.17.0"
      }
    },
    "@mui/lab": {
      "version": "5.0.0-alpha.69",
      "resolved": "https://registry.npmjs.org/@mui/lab/-/lab-5.0.0-alpha.69.tgz",
      "integrity": "sha512-VrTcmXTS9UlTsp40nIZ/R/HBHOvxP2lvgSY9zLSn5XPhMQEMD1H0wTJ68mEuCm18cnl1sbcUOCMfWx9io/u5zg==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@date-io/date-fns": "^2.13.1",
        "@date-io/dayjs": "^2.13.1",
        "@date-io/luxon": "^2.13.1",
        "@date-io/moment": "^2.13.1",
        "@mui/base": "5.0.0-alpha.69",
        "@mui/system": "^5.4.2",
        "@mui/utils": "^5.4.2",
        "clsx": "^1.1.1",
        "prop-types": "^15.7.2",
        "react-is": "^17.0.2",
        "react-transition-group": "^4.4.2",
        "rifm": "^0.12.1"
      }
    },
    "@mui/material": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/material/-/material-5.4.2.tgz",
      "integrity": "sha512-jmeLWEO6AA6g7HErhI3MXVGaMZtqDZjDwcHCg24WY954wO38Xn0zJ53VfpFc44ZTJLV9Ejd7ci9fLlG/HmJCeg==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@mui/base": "5.0.0-alpha.69",
        "@mui/system": "^5.4.2",
        "@mui/types": "^7.1.2",
        "@mui/utils": "^5.4.2",
        "@types/react-transition-group": "^4.4.4",
        "clsx": "^1.1.1",
        "csstype": "^3.0.10",
        "hoist-non-react-statics": "^3.3.2",
        "prop-types": "^15.7.2",
        "react-is": "^17.0.2",
        "react-transition-group": "^4.4.2"
      }
    },
    "@mui/private-theming": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/private-theming/-/private-theming-5.4.2.tgz",
      "integrity": "sha512-mlPDYYko4wIcwXjCPEmOWbNTT4DZ6h9YHdnRtQPnWM28+TRUHEo7SbydnnmVDQLRXUfaH4Y6XtEHIfBNPE/SLg==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@mui/utils": "^5.4.2",
        "prop-types": "^15.7.2"
      }
    },
    "@mui/styled-engine": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/styled-engine/-/styled-engine-5.4.2.tgz",
      "integrity": "sha512-tz9p3aRtzXHKAg7x3BgP0hVQEoGKaxNCFxsJ+d/iqEHYvywWFSs6oxqYAvDHIRpvMlUZyPNoTrkcNnbdMmH/ng==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@emotion/cache": "^11.7.1",
        "prop-types": "^15.7.2"
      }
    },
    "@mui/styles": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/styles/-/styles-5.4.2.tgz",
      "integrity": "sha512-BX75fNHmRF51yove9dBkH28gpSFjClOPDEnUwLTghPYN913OsqViS/iuCd61dxzygtEEmmeYuWfQjxu/F6vF5g==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@emotion/hash": "^0.8.0",
        "@mui/private-theming": "^5.4.2",
        "@mui/types": "^7.1.2",
        "@mui/utils": "^5.4.2",
        "clsx": "^1.1.1",
        "csstype": "^3.0.10",
        "hoist-non-react-statics": "^3.3.2",
        "jss": "^10.8.2",
        "jss-plugin-camel-case": "^10.8.2",
        "jss-plugin-default-unit": "^10.8.2",
        "jss-plugin-global": "^10.8.2",
        "jss-plugin-nested": "^10.8.2",
        "jss-plugin-props-sort": "^10.8.2",
        "jss-plugin-rule-value-function": "^10.8.2",
        "jss-plugin-vendor-prefixer": "^10.8.2",
        "prop-types": "^15.7.2"
      }
    },
    "@mui/system": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/system/-/system-5.4.2.tgz",
      "integrity": "sha512-QegBVu6fxUNov1X9bWc1MZUTeV3A5g9PIpli7d0kzkGfq6JzrJWuPlhSPZ+6hlWmWky+bbAXhU65Qz8atWxDGw==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@mui/private-theming": "^5.4.2",
        "@mui/styled-engine": "^5.4.2",
        "@mui/types": "^7.1.2",
        "@mui/utils": "^5.4.2",
        "clsx": "^1.1.1",
        "csstype": "^3.0.10",
        "prop-types": "^15.7.2"
      }
    },
    "@mui/types": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@mui/types/-/types-7.1.2.tgz",
      "integrity": "sha512-SD7O1nVzqG+ckQpFjDhXPZjRceB8HQFHEvdLLrPhlJy4lLbwEBbxK74Tj4t6Jgk0fTvLJisuwOutrtYe9P/xBQ=="
    },
    "@mui/utils": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/@mui/utils/-/utils-5.4.2.tgz",
      "integrity": "sha512-646dBCC57MXTo/Gf3AnZSHRHznaTETQq5x7AWp5FRQ4jPeyT4WSs18cpJVwkV01cAHKh06pNQTIufIALIWCL5g==",
      "requires": {
        "@babel/runtime": "^7.17.0",
        "@types/prop-types": "^15.7.4",
        "@types/react-is": "^16.7.1 || ^17.0.0",
        "prop-types": "^15.7.2",
        "react-is": "^17.0.2"
      }
    },
    "@onzag/itemize": {
      "version": "0.0.218",
      "resolved": "https://registry.npmjs.org/@onzag/itemize/-/itemize-0.0.218.tgz",
      "integrity": "sha512-11sThw1+DXOL3s/e/QJCxUa/IPgBJOzu8x4oUZl7M9Jvpw+IQR9Q3Gb+jQjUz+X9X0mqjor9udugWxzuSqXd7Q==",
      "requires": {
        "@date-io/moment": "^1.3.13",
        "@elastic/elasticsearch": "8.1.0",
        "@types/autosuggest-highlight": "^3.1.1",
        "@types/bcrypt": "^3.0.1",
        "@types/busboy": "^1.5.0",
        "@types/convert-units": "^2.3.3",
        "@types/deep-equal": "^1.0.1",
        "@types/diacritics": "^1.3.1",
        "@types/dompurify": "^2.2.2",
        "@types/express": "^4.17.12",
        "@types/graphql-fields": "^1.3.3",
        "@types/graphql-upload": "^8.0.5",
        "@types/html-minifier": "^3.5.3",
        "@types/jsdom": "^12.2.4",
        "@types/jsonwebtoken": "^8.5.2",
        "@types/node": "^13.13.52",
        "@types/node-fetch": "^2.5.10",
        "@types/pg": "^7.14.11",
        "@types/pkgcloud": "^1.7.4",
        "@types/properties-reader": "0.0.1",
        "@types/puppeteer": "^3.0.5",
        "@types/react-autosuggest": "^9.3.14",
        "@types/react-leaflet": "^2.8.1",
        "@types/react-router-dom": "^5.1.7",
        "@types/read": "0.0.28",
        "@types/redis": "^2.8.30",
        "@types/sharp": "^0.23.1",
        "@types/slate": "^0.47.11",
        "@types/slate-react": "^0.50.1",
        "@types/socket.io": "^2.1.13",
        "@types/socket.io-client": "^1.4.36",
        "@types/stripe": "^8.0.417",
        "@types/stylis": "^4.0.2",
        "@types/svgo": "^1.3.5",
        "@types/uuid": "^3.4.9",
        "address-rfc2822": "^2.1.0",
        "ajv": "^6.12.6",
        "autosuggest-highlight": "^3.1.1",
        "bcrypt": "^5.0.1",
        "body-parser": "^1.19.0",
        "busboy": "^1.6.0",
        "colors": "^1.4.0",
        "comlink": "^4.3.1",
        "convert-units": "^2.3.4",
        "core-js": "^3.15.2",
        "deep-equal": "^1.1.1",
        "diacritics": "^1.3.0",
        "dompurify": "^2.2.9",
        "express": "^4.17.1",
        "express-graphql": "^0.9.0",
        "form-data": "^4.0.0",
        "graphql": "^14.7.0",
        "graphql-fields": "^2.0.3",
        "graphql-upload": "^9.0.0",
        "history": "^4.10.1",
        "html-minifier": "^4.0.0",
        "idb": "^6.1.2",
        "jsdom": "^15.2.1",
        "json-source-map": "^0.4.0",
        "jsonwebtoken": "^8.5.1",
        "leaflet": "^1.7.1",
        "moment": "^2.29.1",
        "node-fetch": "^2.6.1",
        "pg": "^8.6.0",
        "pkgcloud": "^2.2.0",
        "pretty-bytes": "^5.6.0",
        "properties-reader": "0.0.16",
        "react-autosuggest": "^9.4.3",
        "react-dropzone": "^11.4.2",
        "react-leaflet": "^2.8.0",
        "react-router-dom": "^5.2.0",
        "read": "^1.0.7",
        "redis": "^3.1.1",
        "regenerator-runtime": "^0.13.7",
        "sharp": "^0.23.4",
        "slate": "^0.90.0",
        "slate-history": "^0.86.0",
        "slate-react": "^0.90.0",
        "socket.io": "^2.4.1",
        "socket.io-client": "^2.4.0",
        "source-map-support": "^0.5.19",
        "stripe": "^8.160.0",
        "stylis": "^4.1.3",
        "stylis-plugin-rtl": "^2.1.1",
        "sudo-prompt": "^9.2.1",
        "svgo": "^1.3.2",
        "tarn": "^3.0.1",
        "typescript": "^4.5.5",
        "uuid": "^3.3.3",
        "winston": "^3.3.3",
        "winston-transport": "^4.5.0",
        "yaml": "^1.10.2"
      },
      "dependencies": {
        "@date-io/core": {
          "version": "1.3.13",
          "resolved": "https://registry.npmjs.org/@date-io/core/-/core-1.3.13.tgz",
          "integrity": "sha512-AlEKV7TxjeK+jxWVKcCFrfYAk8spX9aCyiToFIiLPtfQbsjmRGLIhb5VZgptQcJdHtLXo7+m0DuurwFgUToQuA=="
        },
        "@date-io/moment": {
          "version": "1.3.13",
          "resolved": "https://registry.npmjs.org/@date-io/moment/-/moment-1.3.13.tgz",
          "integrity": "sha512-3kJYusJtQuOIxq6byZlzAHoW/18iExJer9qfRF5DyyzdAk074seTuJfdofjz4RFfTd/Idk8WylOQpWtERqvFuQ==",
          "requires": {
            "@date-io/core": "^1.3.13"
          }
        },
        "stylis": {
          "version": "4.1.3",
          "resolved": "https://registry.npmjs.org/stylis/-/stylis-4.1.3.tgz",
          "integrity": "sha512-GP6WDNWf+o403jrEp9c5jibKavrtLW+/qYGhFxFrG8maXhwTBI7gLLhiBb0o7uFccWN+EOS9aMO6cGHWAO07OA=="
        }
      }
    },
    "@popperjs/core": {
      "version": "2.11.2",
      "resolved": "https://registry.npmjs.org/@popperjs/core/-/core-2.11.2.tgz",
      "integrity": "sha512-92FRmppjjqz29VMJ2dn+xdyXZBrMlE42AV6Kq6BwjWV7CNUW1hs2FtxSNLQE+gJhaZ6AAmYuO9y8dshhcBl7vA=="
    },
    "@socket.io/component-emitter": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/@socket.io/component-emitter/-/component-emitter-3.1.0.tgz",
      "integrity": "sha512-+9jVqKhRSpsc591z5vX+X5Yyw+he/HCB4iQ/RYxw35CEPaY1gnsNE43nf9n9AaYjAQrTiI/mOwKUKdUs9vf7Xg=="
    },
    "@types/accepts": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/accepts/-/accepts-1.3.5.tgz",
      "integrity": "sha512-jOdnI/3qTpHABjM5cx1Hc0sKsPoYCp+DP/GJRGtDlPd7fiV9oXGGIcjW/ZOxLIvjGz8MA+uMZI9metHlgqbgwQ==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/autosuggest-highlight": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@types/autosuggest-highlight/-/autosuggest-highlight-3.2.0.tgz",
      "integrity": "sha512-bTcsL4YYypjhKfPaImxuoMPiTyiUp7VGKytMr15/413IoazrOIfV/gca2ysI/IW0ftZYCPI5xppRm6IVX1Efqw=="
    },
    "@types/bcrypt": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@types/bcrypt/-/bcrypt-3.0.1.tgz",
      "integrity": "sha512-SwBrq5wb6jXP0o3O3jStdPWbKpimTImfdFD/OZE3uW+jhGpds/l5wMX9lfYOTDOa5Bod2QmOgo9ln+tMp2XP/w=="
    },
    "@types/body-parser": {
      "version": "1.19.2",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.2.tgz",
      "integrity": "sha512-ALYone6pm6QmwZoAgeyNksccT9Q4AWZQ6PvfwR37GT6r6FWUPguq6sUmNGSMV2Wr761oQoBxwGGa6DR5o1DC9g==",
      "requires": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "@types/busboy": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/@types/busboy/-/busboy-1.5.0.tgz",
      "integrity": "sha512-ncOOhwmyFDW76c/Tuvv9MA9VGYUCn8blzyWmzYELcNGDb0WXWLSmFi7hJq25YdRBYJrmMBB5jZZwUjlJe9HCjQ==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/caseless": {
      "version": "0.12.2",
      "resolved": "https://registry.npmjs.org/@types/caseless/-/caseless-0.12.2.tgz",
      "integrity": "sha512-6ckxMjBBD8URvjB6J3NcnuAn5Pkl7t3TizAg+xdlzzQGSPSmBcXf8KoIH0ua/i+tio+ZRUHEXp0HEmvaR4kt0w=="
    },
    "@types/clean-css": {
      "version": "4.2.6",
      "resolved": "https://registry.npmjs.org/@types/clean-css/-/clean-css-4.2.6.tgz",
      "integrity": "sha512-Ze1tf+LnGPmG6hBFMi0B4TEB0mhF7EiMM5oyjLDNPE9hxrPU0W+5+bHvO+eFPA+bt0iC1zkQMoU/iGdRVjcRbw==",
      "requires": {
        "@types/node": "*",
        "source-map": "^0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "@types/connect": {
      "version": "3.4.35",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.35.tgz",
      "integrity": "sha512-cdeYyv4KWoEgpBISTxWvqYsVy444DOqehiF3fM3ne10AmJ62RSyNkUnxMJXHQWRQQX2eR94m5y1IZyDwBjV9FQ==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/content-disposition": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/@types/content-disposition/-/content-disposition-0.5.5.tgz",
      "integrity": "sha512-v6LCdKfK6BwcqMo+wYW05rLS12S0ZO0Fl4w1h4aaZMD7bqT3gVUns6FvLJKGZHQmYn3SX55JWGpziwJRwVgutA=="
    },
    "@types/convert-units": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@types/convert-units/-/convert-units-2.3.5.tgz",
      "integrity": "sha512-uPxhvoCflbz9hm0aiLEHnwT7JTdhJcKUmArdmmKtWjbK+tw9hUguYh0vTpA5ugqc9/a+hWdPB7NW0SX6peLS8g=="
    },
    "@types/cookies": {
      "version": "0.7.7",
      "resolved": "https://registry.npmjs.org/@types/cookies/-/cookies-0.7.7.tgz",
      "integrity": "sha512-h7BcvPUogWbKCzBR2lY4oqaZbO3jXZksexYJVFvkrFeLgbZjQkU4x8pRq6eg2MHXQhY0McQdqmmsxRWlVAHooA==",
      "requires": {
        "@types/connect": "*",
        "@types/express": "*",
        "@types/keygrip": "*",
        "@types/node": "*"
      }
    },
    "@types/deep-equal": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@types/deep-equal/-/deep-equal-1.0.1.tgz",
      "integrity": "sha512-mMUu4nWHLBlHtxXY17Fg6+ucS/MnndyOWyOe7MmwkoMYxvfQU2ajtRaEvqSUv+aVkMqH/C0NCI8UoVfRNQ10yg=="
    },
    "@types/diacritics": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/@types/diacritics/-/diacritics-1.3.1.tgz",
      "integrity": "sha512-tAH+RY51Zbz7ZSzN7yxQBKEue78U6weZ1UUBNjFoitoLbJGFJCKI7KVHwGsnYo4s2xSFr9KGEkjst2FolpYqyA=="
    },
    "@types/dompurify": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/@types/dompurify/-/dompurify-2.4.0.tgz",
      "integrity": "sha512-IDBwO5IZhrKvHFUl+clZxgf3hn2b/lU6H1KaBShPkQyGJUQ0xwebezIPSuiyGwfz1UzJWQl4M7BDxtHtCCPlTg==",
      "requires": {
        "@types/trusted-types": "*"
      }
    },
    "@types/engine.io": {
      "version": "3.1.7",
      "resolved": "https://registry.npmjs.org/@types/engine.io/-/engine.io-3.1.7.tgz",
      "integrity": "sha512-qNjVXcrp+1sS8YpRUa714r0pgzOwESdW5UjHL7D/2ZFdBX0BXUXtg1LUrp+ylvqbvMcMWUy73YpRoxPN2VoKAQ==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/express": {
      "version": "4.17.17",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.17.tgz",
      "integrity": "sha512-Q4FmmuLGBG58btUnfS1c1r/NQdlp3DMfGDGig8WhfpA2YRUtEkxAjkZb0yvplJGYdF1fsQ81iMDcH24sSCNC/Q==",
      "requires": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^4.17.33",
        "@types/qs": "*",
        "@types/serve-static": "*"
      }
    },
    "@types/express-serve-static-core": {
      "version": "4.17.33",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.17.33.tgz",
      "integrity": "sha512-TPBqmR/HRYI3eC2E5hmiivIzv+bidAfXofM+sbonAGvyDhySGw9/PQZFt2BLOrjUUR++4eJVpx6KnLQK1Fk9tA==",
      "requires": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*"
      }
    },
    "@types/geojson": {
      "version": "7946.0.10",
      "resolved": "https://registry.npmjs.org/@types/geojson/-/geojson-7946.0.10.tgz",
      "integrity": "sha512-Nmh0K3iWQJzniTuPRcJn5hxXkfB1T1pgB89SBig5PlJQU5yocazeu4jATJlaA0GYFKWMqDdvYemoSnF2pXgLVA=="
    },
    "@types/graphql-fields": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/graphql-fields/-/graphql-fields-1.3.5.tgz",
      "integrity": "sha512-F6Nkra4p4MeBRFhg4zfkrnl/2gL4HZdt5lkFgLKZaA+3U/5+eA1dMqSHuSHX7aFUbCFE48ch8qCBXB/udcRhMg==",
      "requires": {
        "graphql": "*"
      }
    },
    "@types/graphql-upload": {
      "version": "8.0.12",
      "resolved": "https://registry.npmjs.org/@types/graphql-upload/-/graphql-upload-8.0.12.tgz",
      "integrity": "sha512-M0ZPZqNUzKNB16q5woEzgG/Q8DjICV80K7JvDSRnDmDFfrRdfFX/n6PbmqAN7gCzECcHVnw1gk6N4Cg0FwxCqA==",
      "requires": {
        "@types/express": "*",
        "@types/koa": "*",
        "fs-capacitor": "^8.0.0",
        "graphql": "0.13.1 - 16"
      }
    },
    "@types/history": {
      "version": "4.7.11",
      "resolved": "https://registry.npmjs.org/@types/history/-/history-4.7.11.tgz",
      "integrity": "sha512-qjDJRrmvBMiTx+jyLxvLfJU7UznFuokDv4f3WRuriHKERccVpFU+8XMQUAbDzoiJCsmexxRExQeMwwCdamSKDA=="
    },
    "@types/html-minifier": {
      "version": "3.5.3",
      "resolved": "https://registry.npmjs.org/@types/html-minifier/-/html-minifier-3.5.3.tgz",
      "integrity": "sha512-j1P/4PcWVVCPEy5lofcHnQ6BtXz9tHGiFPWzqm7TtGuWZEfCHEP446HlkSNc9fQgNJaJZ6ewPtp2aaFla/Uerg==",
      "requires": {
        "@types/clean-css": "*",
        "@types/relateurl": "*",
        "@types/uglify-js": "*"
      }
    },
    "@types/http-assert": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/@types/http-assert/-/http-assert-1.5.3.tgz",
      "integrity": "sha512-FyAOrDuQmBi8/or3ns4rwPno7/9tJTijVW6aQQjK02+kOQ8zmoNg2XJtAuQhvQcy1ASJq38wirX5//9J1EqoUA=="
    },
    "@types/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-/K3ds8TRAfBvi5vfjuz8y6+GiAYBZ0x4tXv1Av6CWBWn0IlADc+ZX9pMq7oU0fNQPnBwIZl3rmeLp6SBApbxSQ=="
    },
    "@types/is-hotkey": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/@types/is-hotkey/-/is-hotkey-0.1.7.tgz",
      "integrity": "sha512-yB5C7zcOM7idwYZZ1wKQ3pTfjA9BbvFqRWvKB46GFddxnJtHwi/b9y84ykQtxQPg5qhdpg4Q/kWU3EGoCTmLzQ=="
    },
    "@types/jsdom": {
      "version": "12.2.4",
      "resolved": "https://registry.npmjs.org/@types/jsdom/-/jsdom-12.2.4.tgz",
      "integrity": "sha512-q+De3S/Ri6U9uPx89YA1XuC+QIBgndIfvBaaJG0pRT8Oqa75k4Mr7G9CRZjIvlbLGIukO/31DFGFJYlQBmXf/A==",
      "requires": {
        "@types/node": "*",
        "@types/tough-cookie": "*",
        "parse5": "^4.0.0"
      }
    },
    "@types/json-schema": {
      "version": "7.0.9",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.9.tgz",
      "integrity": "sha512-qcUXuemtEu+E5wZSJHNxUXeCZhAfXKQ41D+duX+VYPde7xyEVZci+/oXKJL13tnRs9lR2pr4fod59GT6/X1/yQ==",
      "dev": true
    },
    "@types/json5": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
      "integrity": "sha1-7ihweulOEdK4J7y+UnC86n8+ce4="
    },
    "@types/jsonwebtoken": {
      "version": "8.5.9",
      "resolved": "https://registry.npmjs.org/@types/jsonwebtoken/-/jsonwebtoken-8.5.9.tgz",
      "integrity": "sha512-272FMnFGzAVMGtu9tkr29hRL6bZj4Zs1KZNeHLnKqAvp06tAIcarTMwOh8/8bz4FmKRcMxZhZNeUAQsNLoiPhg==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/keygrip": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@types/keygrip/-/keygrip-1.0.2.tgz",
      "integrity": "sha512-GJhpTepz2udxGexqos8wgaBx4I/zWIDPh/KOGEwAqtuGDkOUJu5eFvwmdBX4AmB8Odsr+9pHCQqiAqDL/yKMKw=="
    },
    "@types/koa": {
      "version": "2.13.6",
      "resolved": "https://registry.npmjs.org/@types/koa/-/koa-2.13.6.tgz",
      "integrity": "sha512-diYUfp/GqfWBAiwxHtYJ/FQYIXhlEhlyaU7lB/bWQrx4Il9lCET5UwpFy3StOAohfsxxvEQ11qIJgT1j2tfBvw==",
      "requires": {
        "@types/accepts": "*",
        "@types/content-disposition": "*",
        "@types/cookies": "*",
        "@types/http-assert": "*",
        "@types/http-errors": "*",
        "@types/keygrip": "*",
        "@types/koa-compose": "*",
        "@types/node": "*"
      }
    },
    "@types/koa-compose": {
      "version": "3.2.5",
      "resolved": "https://registry.npmjs.org/@types/koa-compose/-/koa-compose-3.2.5.tgz",
      "integrity": "sha512-B8nG/OoE1ORZqCkBVsup/AKcvjdgoHnfi4pZMn5UwAPCbhk/96xyv284eBYW8JlQbQ7zDmnpFr68I/40mFoIBQ==",
      "requires": {
        "@types/koa": "*"
      }
    },
    "@types/leaflet": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/@types/leaflet/-/leaflet-1.9.3.tgz",
      "integrity": "sha512-Caa1lYOgKVqDkDZVWkto2Z5JtVo09spEaUt2S69LiugbBpoqQu92HYFMGUbYezZbnBkyOxMNPXHSgRrRY5UyIA==",
      "requires": {
        "@types/geojson": "*"
      }
    },
    "@types/lodash": {
      "version": "4.14.194",
      "resolved": "https://registry.npmjs.org/@types/lodash/-/lodash-4.14.194.tgz",
      "integrity": "sha512-r22s9tAS7imvBt2lyHC9B8AGwWnXaYb1tY09oyLkXDs4vArpYJzw09nj8MLx5VfciBPGIb+ZwG0ssYnEPJxn/g=="
    },
    "@types/mime": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-3.0.1.tgz",
      "integrity": "sha512-Y4XFY5VJAuw0FgAqPNd6NNoV44jbq9Bz2L7Rh/J6jLTiHBSBJa9fxqQIvkIld4GsoDOcCbvzOUAbLPsSKKg+uA=="
    },
    "@types/node": {
      "version": "13.13.52",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-13.13.52.tgz",
      "integrity": "sha512-s3nugnZumCC//n4moGGe6tkNMyYEdaDBitVjwPxXmR5lnMG5dHePinH2EdxkG3Rh1ghFHHixAG4NJhpJW1rthQ=="
    },
    "@types/node-fetch": {
      "version": "2.6.3",
      "resolved": "https://registry.npmjs.org/@types/node-fetch/-/node-fetch-2.6.3.tgz",
      "integrity": "sha512-ETTL1mOEdq/sxUtgtOhKjyB2Irra4cjxksvcMUR5Zr4n+PxVhsCD9WS46oPbHL3et9Zde7CNRr+WUNlcHvsX+w==",
      "requires": {
        "@types/node": "*",
        "form-data": "^3.0.0"
      },
      "dependencies": {
        "form-data": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/form-data/-/form-data-3.0.1.tgz",
          "integrity": "sha512-RHkBKtLWUVwd7SqRIvCZMEvAMoGUp0XU+seQiZejj0COz3RI3hWP4sCv3gZWWLjJTd7rGwcsF5eKZGii0r/hbg==",
          "requires": {
            "asynckit": "^0.4.0",
            "combined-stream": "^1.0.8",
            "mime-types": "^2.1.12"
          }
        }
      }
    },
    "@types/parse-json": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@types/parse-json/-/parse-json-4.0.0.tgz",
      "integrity": "sha512-//oorEZjL6sbPcKUaCdIGlIUeH26mgzimjBB77G6XRgnDl/L5wOnpyBGRe/Mmf5CVW3PwEBE1NjiMZ/ssFh4wA=="
    },
    "@types/pg": {
      "version": "7.14.11",
      "resolved": "https://registry.npmjs.org/@types/pg/-/pg-7.14.11.tgz",
      "integrity": "sha512-EnZkZ1OMw9DvNfQkn2MTJrwKmhJYDEs5ujWrPfvseWNoI95N8B4HzU/Ltrq5ZfYxDX/Zg8mTzwr6UAyTjjFvXA==",
      "requires": {
        "@types/node": "*",
        "pg-protocol": "^1.2.0",
        "pg-types": "^2.2.0"
      }
    },
    "@types/pkgcloud": {
      "version": "1.7.5",
      "resolved": "https://registry.npmjs.org/@types/pkgcloud/-/pkgcloud-1.7.5.tgz",
      "integrity": "sha512-k1UffrESqhsajxHsH49vHvyY7dRf9c+42Y/4LS4HHMEbIJ+3I+ccF50Q3LcA9uh1reZ2iPtaw+NQRMcuYyhlOQ==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/prop-types": {
      "version": "15.7.4",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.4.tgz",
      "integrity": "sha512-rZ5drC/jWjrArrS8BR6SIr4cWpW09RNTYt9AMZo3Jwwif+iacXAqgVjm0B0Bv/S1jhDXKHqRVNCbACkJ89RAnQ=="
    },
    "@types/properties-reader": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/@types/properties-reader/-/properties-reader-0.0.1.tgz",
      "integrity": "sha512-uhOYv4GJo1GjinM1U9AztqoqBkPTJ5E82gC/7yR6LJCyu2JnX8/8wyiDwAFoDJhjvPRtczkrvHorv74+P7xgOg=="
    },
    "@types/puppeteer": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/@types/puppeteer/-/puppeteer-3.0.6.tgz",
      "integrity": "sha512-RAKTyvL2MfxEUCTNVERoCypGWtxT8xX38iK2pCF2lQrlin9fHEfs3dkBsqt44xvtXP52WoRAo7uBzd6SNt9SSA==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/q": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@types/q/-/q-1.5.5.tgz",
      "integrity": "sha512-L28j2FcJfSZOnL1WBjDYp2vUHCeIFlyYI/53EwD/rKUBQ7MtUUfbQWiyKJGpcnv4/WgrhWsFKrcPstcAt/J0tQ=="
    },
    "@types/qs": {
      "version": "6.9.7",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.9.7.tgz",
      "integrity": "sha512-FGa1F62FT09qcrueBA6qYTrJPVDzah9a+493+o2PCXsesWHIn27G98TsSMs3WPNbZIEj4+VJf6saSFpvD+3Zsw=="
    },
    "@types/range-parser": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.4.tgz",
      "integrity": "sha512-EEhsLsD6UsDM1yFhAvy0Cjr6VwmpMWqFBCb9w07wVugF7w9nfajxLuVmngTIpgS6svCnm6Vaw+MZhoDCKnOfsw=="
    },
    "@types/react": {
      "version": "17.0.39",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-17.0.39.tgz",
      "integrity": "sha512-UVavlfAxDd/AgAacMa60Azl7ygyQNRwC/DsHZmKgNvPmRR5p70AJ5Q9EAmL2NWOJmeV+vVUI4IAP7GZrN8h8Ug==",
      "requires": {
        "@types/prop-types": "*",
        "@types/scheduler": "*",
        "csstype": "^3.0.2"
      }
    },
    "@types/react-autosuggest": {
      "version": "9.3.14",
      "resolved": "https://registry.npmjs.org/@types/react-autosuggest/-/react-autosuggest-9.3.14.tgz",
      "integrity": "sha512-cvGpKaQaNsFbDxTwP56VKVj2FO6SpJ9PsrQtlVzN7aVa/SsMZoQrBLEUx5HQKfIS4Zupb6K4tHmIyTjF7AEcow==",
      "requires": {
        "@types/react": "*"
      }
    },
    "@types/react-dom": {
      "version": "17.0.11",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-17.0.11.tgz",
      "integrity": "sha512-f96K3k+24RaLGVu/Y2Ng3e1EbZ8/cVJvypZWd7cy0ofCBaf2lcM46xNhycMZ2xGwbBjRql7hOlZ+e2WlJ5MH3Q==",
      "requires": {
        "@types/react": "*"
      }
    },
    "@types/react-is": {
      "version": "17.0.3",
      "resolved": "https://registry.npmjs.org/@types/react-is/-/react-is-17.0.3.tgz",
      "integrity": "sha512-aBTIWg1emtu95bLTLx0cpkxwGW3ueZv71nE2YFBpL8k/z5czEW8yYpOo8Dp+UUAFAtKwNaOsh/ioSeQnWlZcfw==",
      "requires": {
        "@types/react": "*"
      }
    },
    "@types/react-leaflet": {
      "version": "2.8.3",
      "resolved": "https://registry.npmjs.org/@types/react-leaflet/-/react-leaflet-2.8.3.tgz",
      "integrity": "sha512-MeBQnVQe6ikw8dkuZE4F96PvMdQeilZG6/ekk5XxhkSzU3lofedULn3UR/6G0uIHjbRazi4DA8LnLACX0bPhBg==",
      "requires": {
        "@types/leaflet": "*",
        "@types/react": "*"
      }
    },
    "@types/react-router": {
      "version": "5.1.20",
      "resolved": "https://registry.npmjs.org/@types/react-router/-/react-router-5.1.20.tgz",
      "integrity": "sha512-jGjmu/ZqS7FjSH6owMcD5qpq19+1RS9DeVRqfl1FeBMxTDQAGwlMWOcs52NDoXaNKyG3d1cYQFMs9rCrb88o9Q==",
      "requires": {
        "@types/history": "^4.7.11",
        "@types/react": "*"
      }
    },
    "@types/react-router-dom": {
      "version": "5.3.3",
      "resolved": "https://registry.npmjs.org/@types/react-router-dom/-/react-router-dom-5.3.3.tgz",
      "integrity": "sha512-kpqnYK4wcdm5UaWI3fLcELopqLrHgLqNsdpHauzlQktfkHL3npOSwtj1Uz9oKBAzs7lFtVkV8j83voAz2D8fhw==",
      "requires": {
        "@types/history": "^4.7.11",
        "@types/react": "*",
        "@types/react-router": "*"
      }
    },
    "@types/react-transition-group": {
      "version": "4.4.4",
      "resolved": "https://registry.npmjs.org/@types/react-transition-group/-/react-transition-group-4.4.4.tgz",
      "integrity": "sha512-7gAPz7anVK5xzbeQW9wFBDg7G++aPLAFY0QaSMOou9rJZpbuI58WAuJrgu+qR92l61grlnCUe7AFX8KGahAgug==",
      "requires": {
        "@types/react": "*"
      }
    },
    "@types/read": {
      "version": "0.0.28",
      "resolved": "https://registry.npmjs.org/@types/read/-/read-0.0.28.tgz",
      "integrity": "sha512-+25g+VYVJEDgGxV5c2V2nPXEPNWstnm9dW2BJXN5fmTcCL7Flq3bCikUFBkU3PkhN0V1hxBM3pkssC3g5+ZPNw=="
    },
    "@types/readable-stream": {
      "version": "2.3.15",
      "resolved": "https://registry.npmjs.org/@types/readable-stream/-/readable-stream-2.3.15.tgz",
      "integrity": "sha512-oM5JSKQCcICF1wvGgmecmHldZ48OZamtMxcGGVICOJA8o8cahXC1zEVAif8iwoc5j8etxFaRFnf095+CDsuoFQ==",
      "requires": {
        "@types/node": "*",
        "safe-buffer": "~5.1.1"
      }
    },
    "@types/redis": {
      "version": "2.8.32",
      "resolved": "https://registry.npmjs.org/@types/redis/-/redis-2.8.32.tgz",
      "integrity": "sha512-7jkMKxcGq9p242exlbsVzuJb57KqHRhNl4dHoQu2Y5v9bCAbtIXXH0R3HleSQW4CTOqpHIYUW3t6tpUj4BVQ+w==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/relateurl": {
      "version": "0.2.29",
      "resolved": "https://registry.npmjs.org/@types/relateurl/-/relateurl-0.2.29.tgz",
      "integrity": "sha512-QSvevZ+IRww2ldtfv1QskYsqVVVwCKQf1XbwtcyyoRvLIQzfyPhj/C+3+PKzSDRdiyejaiLgnq//XTkleorpLg=="
    },
    "@types/request": {
      "version": "2.48.8",
      "resolved": "https://registry.npmjs.org/@types/request/-/request-2.48.8.tgz",
      "integrity": "sha512-whjk1EDJPcAR2kYHRbFl/lKeeKYTi05A15K9bnLInCVroNDCtXce57xKdI0/rQaA3K+6q0eFyUBPmqfSndUZdQ==",
      "requires": {
        "@types/caseless": "*",
        "@types/node": "*",
        "@types/tough-cookie": "*",
        "form-data": "^2.5.0"
      },
      "dependencies": {
        "form-data": {
          "version": "2.5.1",
          "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.5.1.tgz",
          "integrity": "sha512-m21N3WOmEEURgk6B9GLOE4RuWOFf28Lhh9qGYeNlGq4VDXUlJy2th2slBNU8Gp8EzloYZOibZJ7t5ecIrFSjVA==",
          "requires": {
            "asynckit": "^0.4.0",
            "combined-stream": "^1.0.6",
            "mime-types": "^2.1.12"
          }
        }
      }
    },
    "@types/scheduler": {
      "version": "0.16.2",
      "resolved": "https://registry.npmjs.org/@types/scheduler/-/scheduler-0.16.2.tgz",
      "integrity": "sha512-hppQEBDmlwhFAXKJX2KnWLYu5yMfi91yazPb2l+lbJiwW+wdo1gNeRA+3RgNSO39WYX2euey41KEwnqesU2Jew=="
    },
    "@types/serve-static": {
      "version": "1.15.1",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.1.tgz",
      "integrity": "sha512-NUo5XNiAdULrJENtJXZZ3fHtfMolzZwczzBbnAeBbqBwG+LaG6YaJtuwzwGSQZ2wsCrxjEhNNjAkKigy3n8teQ==",
      "requires": {
        "@types/mime": "*",
        "@types/node": "*"
      }
    },
    "@types/sharp": {
      "version": "0.23.1",
      "resolved": "https://registry.npmjs.org/@types/sharp/-/sharp-0.23.1.tgz",
      "integrity": "sha512-iBRM9RjRF9pkIkukk6imlxfaKMRuiRND8L0yYKl5PJu5uLvxuNzp5f0x8aoTG5VX85M8O//BwbttzFVZL1j/FQ==",
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/slate": {
      "version": "0.47.11",
      "resolved": "https://registry.npmjs.org/@types/slate/-/slate-0.47.11.tgz",
      "integrity": "sha512-wQ09e75s8n9B7MQWxDwwR1AhwRu/yyl//GEonqV5mrPipoXsEnBE99FWpWYCaClPLzDElfrla5YQyRzyOSlViA==",
      "requires": {
        "@types/react": "*",
        "immutable": "^3.8.2"
      }
    },
    "@types/slate-react": {
      "version": "0.50.1",
      "resolved": "https://registry.npmjs.org/@types/slate-react/-/slate-react-0.50.1.tgz",
      "integrity": "sha512-Mm0KKNRYAj+vHrNXSjICzOgNXgm66rbh9NaSf1WvBBL6oRIeoJJeceMenZP7NDVwLokd7fBuRsn7jSRzT9Z/4Q==",
      "requires": {
        "slate-react": "*"
      }
    },
    "@types/socket.io": {
      "version": "2.1.13",
      "resolved": "https://registry.npmjs.org/@types/socket.io/-/socket.io-2.1.13.tgz",
      "integrity": "sha512-JRgH3nCgsWel4OPANkhH8TelpXvacAJ9VeryjuqCDiaVDMpLysd6sbt0dr6Z15pqH3p2YpOT3T1C5vQ+O/7uyg==",
      "requires": {
        "@types/engine.io": "*",
        "@types/node": "*",
        "@types/socket.io-parser": "*"
      }
    },
    "@types/socket.io-client": {
      "version": "1.4.36",
      "resolved": "https://registry.npmjs.org/@types/socket.io-client/-/socket.io-client-1.4.36.tgz",
      "integrity": "sha512-ZJWjtFBeBy1kRSYpVbeGYTElf6BqPQUkXDlHHD4k/42byCN5Rh027f4yARHCink9sKAkbtGZXEAmR0ZCnc2/Ag=="
    },
    "@types/socket.io-parser": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/@types/socket.io-parser/-/socket.io-parser-3.0.0.tgz",
      "integrity": "sha512-Ry/rbTE6HQNL9eu3LpL1Ocup5VexXu1bSSGlSho/IR5LuRc8YvxwSNJ3JxqTltVJEATLbZkMQETSbxfKNgp4Ew==",
      "requires": {
        "socket.io-parser": "*"
      }
    },
    "@types/stripe": {
      "version": "8.0.417",
      "resolved": "https://registry.npmjs.org/@types/stripe/-/stripe-8.0.417.tgz",
      "integrity": "sha512-PTuqskh9YKNENnOHGVJBm4sM0zE8B1jZw1JIskuGAPkMB+OH236QeN8scclhYGPA4nG6zTtPXgwpXdp+HPDTVw==",
      "requires": {
        "stripe": "*"
      }
    },
    "@types/stylis": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/stylis/-/stylis-4.0.2.tgz",
      "integrity": "sha512-wtckGuk1eXUlUz0Qb1eXHG37Z7HWT2GfMdqRf8F/ifddTwadSS9Jwsqi4qtXk7cP7MtoyGVIHPElFCLc6HItbg=="
    },
    "@types/svgo": {
      "version": "1.3.6",
      "resolved": "https://registry.npmjs.org/@types/svgo/-/svgo-1.3.6.tgz",
      "integrity": "sha512-AZU7vQcy/4WFEuwnwsNsJnFwupIpbllH1++LXScN6uxT1Z4zPzdrWG97w4/I7eFKFTvfy/bHFStWjdBAg2Vjug=="
    },
    "@types/tough-cookie": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/tough-cookie/-/tough-cookie-4.0.2.tgz",
      "integrity": "sha512-Q5vtl1W5ue16D+nIaW8JWebSSraJVlK+EthKn7e7UcD4KWsaSJ8BqGPXNaPghgtcn/fhvrN17Tv8ksUsQpiplw=="
    },
    "@types/triple-beam": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@types/triple-beam/-/triple-beam-1.3.2.tgz",
      "integrity": "sha512-txGIh+0eDFzKGC25zORnswy+br1Ha7hj5cMVwKIU7+s0U2AxxJru/jZSMU6OC9MJWP6+pc/hc6ZjyZShpsyY2g=="
    },
    "@types/trusted-types": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/@types/trusted-types/-/trusted-types-2.0.3.tgz",
      "integrity": "sha512-NfQ4gyz38SL8sDNrSixxU2Os1a5xcdFxipAFxYEuLUlvU2uDwS4NUpsImcf1//SlWItCVMMLiylsxbmNMToV/g=="
    },
    "@types/uglify-js": {
      "version": "3.17.1",
      "resolved": "https://registry.npmjs.org/@types/uglify-js/-/uglify-js-3.17.1.tgz",
      "integrity": "sha512-GkewRA4i5oXacU/n4MA9+bLgt5/L3F1mKrYvFGm7r2ouLXhRKjuWwo9XHNnbx6WF3vlGW21S3fCvgqxvxXXc5g==",
      "requires": {
        "source-map": "^0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "@types/uuid": {
      "version": "3.4.10",
      "resolved": "https://registry.npmjs.org/@types/uuid/-/uuid-3.4.10.tgz",
      "integrity": "sha512-BgeaZuElf7DEYZhWYDTc/XcLZXdVgFkVSTa13BqKvbnmUrxr3TJFKofUxCtDO9UQOdhnV+HPOESdHiHKZOJV1A=="
    },
    "@types/yauzl": {
      "version": "2.9.2",
      "resolved": "https://registry.npmjs.org/@types/yauzl/-/yauzl-2.9.2.tgz",
      "integrity": "sha512-8uALY5LTvSuHgloDVUvWP3pIauILm+8/0pDMokuDYIoNsOkSwd5AiHBTSEJjKTDcZr5z8UpgOWZkxBF4iJftoA==",
      "dev": true,
      "optional": true,
      "requires": {
        "@types/node": "*"
      }
    },
    "@webassemblyjs/ast": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.9.0.tgz",
      "integrity": "sha512-C6wW5L+b7ogSDVqymbkkvuW9kruN//YisMED04xzeBBqjHa2FYnmvOlS6Xj68xWQRgWvI9cIglsjFowH/RJyEA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/helper-module-context": "1.9.0",
        "@webassemblyjs/helper-wasm-bytecode": "1.9.0",
        "@webassemblyjs/wast-parser": "1.9.0"
      }
    },
    "@webassemblyjs/floating-point-hex-parser": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.9.0.tgz",
      "integrity": "sha512-TG5qcFsS8QB4g4MhrxK5TqfdNe7Ey/7YL/xN+36rRjl/BlGE/NcBvJcqsRgCP6Z92mRE+7N50pRIi8SmKUbcQA==",
      "dev": true
    },
    "@webassemblyjs/helper-api-error": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.9.0.tgz",
      "integrity": "sha512-NcMLjoFMXpsASZFxJ5h2HZRcEhDkvnNFOAKneP5RbKRzaWJN36NC4jqQHKwStIhGXu5mUWlUUk7ygdtrO8lbmw==",
      "dev": true
    },
    "@webassemblyjs/helper-buffer": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.9.0.tgz",
      "integrity": "sha512-qZol43oqhq6yBPx7YM3m9Bv7WMV9Eevj6kMi6InKOuZxhw+q9hOkvq5e/PpKSiLfyetpaBnogSbNCfBwyB00CA==",
      "dev": true
    },
    "@webassemblyjs/helper-code-frame": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.9.0.tgz",
      "integrity": "sha512-ERCYdJBkD9Vu4vtjUYe8LZruWuNIToYq/ME22igL+2vj2dQ2OOujIZr3MEFvfEaqKoVqpsFKAGsRdBSBjrIvZA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/wast-printer": "1.9.0"
      }
    },
    "@webassemblyjs/helper-fsm": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.9.0.tgz",
      "integrity": "sha512-OPRowhGbshCb5PxJ8LocpdX9Kl0uB4XsAjl6jH/dWKlk/mzsANvhwbiULsaiqT5GZGT9qinTICdj6PLuM5gslw==",
      "dev": true
    },
    "@webassemblyjs/helper-module-context": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.9.0.tgz",
      "integrity": "sha512-MJCW8iGC08tMk2enck1aPW+BE5Cw8/7ph/VGZxwyvGbJwjktKkDK7vy7gAmMDx88D7mhDTCNKAW5tED+gZ0W8g==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0"
      }
    },
    "@webassemblyjs/helper-wasm-bytecode": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.9.0.tgz",
      "integrity": "sha512-R7FStIzyNcd7xKxCZH5lE0Bqy+hGTwS3LJjuv1ZVxd9O7eHCedSdrId/hMOd20I+v8wDXEn+bjfKDLzTepoaUw==",
      "dev": true
    },
    "@webassemblyjs/helper-wasm-section": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.9.0.tgz",
      "integrity": "sha512-XnMB8l3ek4tvrKUUku+IVaXNHz2YsJyOOmz+MMkZvh8h1uSJpSen6vYnw3IoQ7WwEuAhL8Efjms1ZWjqh2agvw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/helper-buffer": "1.9.0",
        "@webassemblyjs/helper-wasm-bytecode": "1.9.0",
        "@webassemblyjs/wasm-gen": "1.9.0"
      }
    },
    "@webassemblyjs/ieee754": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.9.0.tgz",
      "integrity": "sha512-dcX8JuYU/gvymzIHc9DgxTzUUTLexWwt8uCTWP3otys596io0L5aW02Gb1RjYpx2+0Jus1h4ZFqjla7umFniTg==",
      "dev": true,
      "requires": {
        "@xtuc/ieee754": "^1.2.0"
      }
    },
    "@webassemblyjs/leb128": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.9.0.tgz",
      "integrity": "sha512-ENVzM5VwV1ojs9jam6vPys97B/S65YQtv/aanqnU7D8aSoHFX8GyhGg0CMfyKNIHBuAVjy3tlzd5QMMINa7wpw==",
      "dev": true,
      "requires": {
        "@xtuc/long": "4.2.2"
      }
    },
    "@webassemblyjs/utf8": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.9.0.tgz",
      "integrity": "sha512-GZbQlWtopBTP0u7cHrEx+73yZKrQoBMpwkGEIqlacljhXCkVM1kMQge/Mf+csMJAjEdSwhOyLAS0AoR3AG5P8w==",
      "dev": true
    },
    "@webassemblyjs/wasm-edit": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.9.0.tgz",
      "integrity": "sha512-FgHzBm80uwz5M8WKnMTn6j/sVbqilPdQXTWraSjBwFXSYGirpkSWE2R9Qvz9tNiTKQvoKILpCuTjBKzOIm0nxw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/helper-buffer": "1.9.0",
        "@webassemblyjs/helper-wasm-bytecode": "1.9.0",
        "@webassemblyjs/helper-wasm-section": "1.9.0",
        "@webassemblyjs/wasm-gen": "1.9.0",
        "@webassemblyjs/wasm-opt": "1.9.0",
        "@webassemblyjs/wasm-parser": "1.9.0",
        "@webassemblyjs/wast-printer": "1.9.0"
      }
    },
    "@webassemblyjs/wasm-gen": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.9.0.tgz",
      "integrity": "sha512-cPE3o44YzOOHvlsb4+E9qSqjc9Qf9Na1OO/BHFy4OI91XDE14MjFN4lTMezzaIWdPqHnsTodGGNP+iRSYfGkjA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/helper-wasm-bytecode": "1.9.0",
        "@webassemblyjs/ieee754": "1.9.0",
        "@webassemblyjs/leb128": "1.9.0",
        "@webassemblyjs/utf8": "1.9.0"
      }
    },
    "@webassemblyjs/wasm-opt": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.9.0.tgz",
      "integrity": "sha512-Qkjgm6Anhm+OMbIL0iokO7meajkzQD71ioelnfPEj6r4eOFuqm4YC3VBPqXjFyyNwowzbMD+hizmprP/Fwkl2A==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/helper-buffer": "1.9.0",
        "@webassemblyjs/wasm-gen": "1.9.0",
        "@webassemblyjs/wasm-parser": "1.9.0"
      }
    },
    "@webassemblyjs/wasm-parser": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.9.0.tgz",
      "integrity": "sha512-9+wkMowR2AmdSWQzsPEjFU7njh8HTO5MqO8vjwEHuM+AMHioNqSBONRdr0NQQ3dVQrzp0s8lTcYqzUdb7YgELA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/helper-api-error": "1.9.0",
        "@webassemblyjs/helper-wasm-bytecode": "1.9.0",
        "@webassemblyjs/ieee754": "1.9.0",
        "@webassemblyjs/leb128": "1.9.0",
        "@webassemblyjs/utf8": "1.9.0"
      }
    },
    "@webassemblyjs/wast-parser": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.9.0.tgz",
      "integrity": "sha512-qsqSAP3QQ3LyZjNC/0jBJ/ToSxfYJ8kYyuiGvtn/8MK89VrNEfwj7BPQzJVHi0jGTRK2dGdJ5PRqhtjzoww+bw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/floating-point-hex-parser": "1.9.0",
        "@webassemblyjs/helper-api-error": "1.9.0",
        "@webassemblyjs/helper-code-frame": "1.9.0",
        "@webassemblyjs/helper-fsm": "1.9.0",
        "@xtuc/long": "4.2.2"
      }
    },
    "@webassemblyjs/wast-printer": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.9.0.tgz",
      "integrity": "sha512-2J0nE95rHXHyQ24cWjMKJ1tqB/ds8z/cyeOZxJhcb+rW+SQASVjuznUSmdz5GpVJTzU8JkhYut0D3siFDD6wsA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/wast-parser": "1.9.0",
        "@xtuc/long": "4.2.2"
      }
    },
    "@xtuc/ieee754": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
      "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA==",
      "dev": true
    },
    "@xtuc/long": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.2.tgz",
      "integrity": "sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ==",
      "dev": true
    },
    "abab": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/abab/-/abab-2.0.6.tgz",
      "integrity": "sha512-j2afSsaIENvHZN2B8GOpF566vZ5WVk5opAiMTvWgaQT8DkbOqsTfvNAvHoRGU2zzP8cPoqys+xHTRDWW8L+/BA=="
    },
    "abbrev": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-1.1.1.tgz",
      "integrity": "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q=="
    },
    "abort-controller": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
      "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
      "requires": {
        "event-target-shim": "^5.0.0"
      }
    },
    "accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "requires": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      }
    },
    "acorn": {
      "version": "7.4.1",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.4.1.tgz",
      "integrity": "sha512-nQyp0o1/mNdbTO1PO6kHkwSrmgZ0MT/jCCpNiwbUjGoRN4dlBhqJtoQuCnEOKzgTVwg0ZWiCoQy6SxMebQVh8A=="
    },
    "acorn-globals": {
      "version": "4.3.4",
      "resolved": "https://registry.npmjs.org/acorn-globals/-/acorn-globals-4.3.4.tgz",
      "integrity": "sha512-clfQEh21R+D0leSbUdWf3OcfqyaCSAQ8Ryq00bofSekfr9W8u1jyYZo6ir0xu9Gtcf7BjcHJpnbZH7JOCpP60A==",
      "requires": {
        "acorn": "^6.0.1",
        "acorn-walk": "^6.0.1"
      },
      "dependencies": {
        "acorn": {
          "version": "6.4.2",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.4.2.tgz",
          "integrity": "sha512-XtGIhXwF8YM8bJhGxG5kXgjkEuNGLTkoYqVE+KMR+aspr4KGYmKYg7yUe3KghyQ9yheNwLnjmzh/7+gfDBmHCQ=="
        }
      }
    },
    "acorn-walk": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-6.2.0.tgz",
      "integrity": "sha512-7evsyfH1cLOCdAzZAd43Cic04yKydNx0cF+7tiA19p1XnLLPU4dpCQOqpjqwokFe//vS0QqfqqjCS2JkiIs0cA=="
    },
    "address-rfc2822": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/address-rfc2822/-/address-rfc2822-2.1.0.tgz",
      "integrity": "sha512-TwoTmJcYzS+CLw/h+AO3zOzRFGSMNowmp/tlOXcYPygkr2vMAWLs0pDajJiJK/dtVPpFx1utw/CzzLfmmtkagw==",
      "requires": {
        "email-addresses": "^4.0.0"
      }
    },
    "after": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/after/-/after-0.8.2.tgz",
      "integrity": "sha512-QbJ0NTQ/I9DI3uSJA4cbexiwQeRAfjPScqIbSjUDd9TOrcg6pTkdgziesOqxBMBzit8vFCTwrP27t13vFOORRA=="
    },
    "agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "requires": {
        "debug": "4"
      }
    },
    "ajv": {
      "version": "6.12.6",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
      "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
      "requires": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      }
    },
    "ajv-errors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.1.tgz",
      "integrity": "sha512-DCRfO/4nQ+89p/RK43i8Ezd41EqdGIU4ld7nGF8OQ14oc/we5rEntLCUa7+jrn3nn83BosfwZA0wb4pon2o8iQ==",
      "dev": true
    },
    "ajv-keywords": {
      "version": "3.5.2",
      "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.5.2.tgz",
      "integrity": "sha512-5p6WTN0DdTGVQk6VjcEju19IgaHudalcfabD7yhDGeA6bcQnmL+CpveLJq/3hvfwd1aof6L386Ougkx6RfyMIQ==",
      "dev": true
    },
    "amdefine": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/amdefine/-/amdefine-1.0.1.tgz",
      "integrity": "sha1-SlKCrBZHKek2Gbz9OtFR+BfOkfU=",
      "dev": true
    },
    "ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="
    },
    "ansi-styles": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
      "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
      "requires": {
        "color-convert": "^1.9.0"
      }
    },
    "anymatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.2.tgz",
      "integrity": "sha512-P43ePfOAIupkguHUycrc4qJ9kz8ZiuOUijaETwX7THt0Y/GNK7v0aa8rY816xWjZ7rJdA5XdMcpVFTKMq+RvWg==",
      "dev": true,
      "optional": true,
      "requires": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      }
    },
    "aproba": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/aproba/-/aproba-2.0.0.tgz",
      "integrity": "sha512-lYe4Gx7QT+MKGbDsA+Z+he/Wtef0BiwDOlK/XkBrdfsh9J/jPPXbX0tE9x9cl27Tmu5gg3QUbUrQYa/y+KOHPQ=="
    },
    "are-we-there-yet": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-2.0.0.tgz",
      "integrity": "sha512-Ci/qENmwHnsYo9xKIcUJN5LeDKdJ6R1Z1j9V/J5wyq8nh/mYPEpIKJbBZXtZjG04HiK7zV/p6Vs9952MrMeUIw==",
      "requires": {
        "delegates": "^1.0.0",
        "readable-stream": "^3.6.0"
      }
    },
    "argparse": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
      "requires": {
        "sprintf-js": "~1.0.2"
      }
    },
    "arr-diff": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
      "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
      "dev": true
    },
    "arr-flatten": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
      "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg==",
      "dev": true
    },
    "arr-union": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
      "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ=",
      "dev": true
    },
    "array-buffer-byte-length": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-buffer-byte-length/-/array-buffer-byte-length-1.0.0.tgz",
      "integrity": "sha512-LPuwb2P+NrQw3XhxGc36+XSvuBPopovXYTR9Ew++Du9Yb/bx5AzBfrIsBoj0EZUifjQU+sHL21sseZ3jerWO/A==",
      "requires": {
        "call-bind": "^1.0.2",
        "is-array-buffer": "^3.0.1"
      }
    },
    "array-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-equal/-/array-equal-1.0.0.tgz",
      "integrity": "sha512-H3LU5RLiSsGXPhN+Nipar0iR0IofH+8r89G2y1tBKxQ/agagKyAjhkAFDRBfodP2caPrNKHpAWNIM/c9yeL7uA=="
    },
    "array-find-index": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-find-index/-/array-find-index-1.0.2.tgz",
      "integrity": "sha1-3wEKoSh+Fku9pvlyOwqWoexBh6E=",
      "dev": true
    },
    "array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha1-ml9pkFGx5wczKPKgCJaLZOopVdI="
    },
    "array-unique": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
      "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
      "dev": true
    },
    "array.prototype.reduce": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/array.prototype.reduce/-/array.prototype.reduce-1.0.5.tgz",
      "integrity": "sha512-kDdugMl7id9COE8R7MHF5jWk7Dqt/fs4Pv+JXoICnYwqpjjjbUurz6w5fT5IG6brLdJhv6/VoHB0H7oyIBXd+Q==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.4",
        "es-abstract": "^1.20.4",
        "es-array-method-boxes-properly": "^1.0.0",
        "is-string": "^1.0.7"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        }
      }
    },
    "arraybuffer.slice": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/arraybuffer.slice/-/arraybuffer.slice-0.0.7.tgz",
      "integrity": "sha512-wGUIVQXuehL5TCqQun8OW81jGzAWycqzFF8lFp+GOM5BXLYj3bKNsYC4daB7n6XjCqxQA/qgTJ+8ANR3acjrog=="
    },
    "arrify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
      "integrity": "sha512-3CYzex9M9FGQjCGMGyi6/31c8GJbgb0qGyrx5HWxPd0aCwh4cB2YjMb2Xf9UuoogrMrlO9cTqnB5rI5GHZTcUA=="
    },
    "asn1": {
      "version": "0.2.6",
      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.6.tgz",
      "integrity": "sha512-ix/FxPn0MDjeyJ7i/yoHGFt/EX6LyNbxSEhPPXODPL+KB0VPk86UYfL0lMdy+KCnv+fmvIzySwaK5COwqVbWTQ==",
      "requires": {
        "safer-buffer": "~2.1.0"
      }
    },
    "asn1.js": {
      "version": "5.4.1",
      "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-5.4.1.tgz",
      "integrity": "sha512-+I//4cYPccV8LdmBLiX8CYvf9Sp3vQsrqu2QNXRcrbiWvcx/UdlFiqUJJzxRQxgsZmvhXhn4cSKeSmoFjVdupA==",
      "dev": true,
      "requires": {
        "bn.js": "^4.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0",
        "safer-buffer": "^2.1.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.12.0",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
          "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA==",
          "dev": true
        }
      }
    },
    "assert": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/assert/-/assert-1.5.0.tgz",
      "integrity": "sha512-EDsgawzwoun2CZkCgtxJbv392v4nbk9XDD06zI+kQYoBM/3RBWLlEyJARDOmhAAosBjWACEkKL6S+lIZtcAubA==",
      "dev": true,
      "requires": {
        "object-assign": "^4.1.1",
        "util": "0.10.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
          "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE=",
          "dev": true
        },
        "util": {
          "version": "0.10.3",
          "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
          "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
          "dev": true,
          "requires": {
            "inherits": "2.0.1"
          }
        }
      }
    },
    "assert-plus": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
      "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU="
    },
    "assign-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
      "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c=",
      "dev": true
    },
    "async": {
      "version": "2.6.3",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",
      "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",
      "requires": {
        "lodash": "^4.17.14"
      }
    },
    "async-each": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.3.tgz",
      "integrity": "sha512-z/WhQ5FPySLdvREByI2vZiTWwCnF0moMJ1hK9YQwDTHKh6I7/uSckMetoRGb5UBZPC1z0jlw+n/XCgjeH7y1AQ==",
      "dev": true,
      "optional": true
    },
    "async-foreach": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/async-foreach/-/async-foreach-0.1.3.tgz",
      "integrity": "sha1-NhIfhFwFeBct5Bmpfb6x0W7DRUI=",
      "dev": true
    },
    "async-limiter": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/async-limiter/-/async-limiter-1.0.1.tgz",
      "integrity": "sha512-csOlWGAcRFJaI6m+F2WKdnMKr4HhdhFVBk0H/QbJFMCr+uO2kwohwXQPxw/9OCxp05r5ghVBFSyioixx3gfkNQ==",
      "dev": true
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
    },
    "atob": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
      "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg==",
      "dev": true
    },
    "attr-accept": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/attr-accept/-/attr-accept-2.2.2.tgz",
      "integrity": "sha512-7prDjvt9HmqiZ0cl5CRjtS84sEyhsHP2coDkaZKRKVfCDo9s7iw7ChVmar78Gu9pC4SoR/28wFu/G5JJhTnqEg=="
    },
    "autosuggest-highlight": {
      "version": "3.3.4",
      "resolved": "https://registry.npmjs.org/autosuggest-highlight/-/autosuggest-highlight-3.3.4.tgz",
      "integrity": "sha512-j6RETBD2xYnrVcoV1S5R4t3WxOlWZKyDQjkwnggDPSjF5L4jV98ZltBpvPvbkM1HtoSe5o+bNrTHyjPbieGeYA==",
      "requires": {
        "remove-accents": "^0.4.2"
      }
    },
    "available-typed-arrays": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.5.tgz",
      "integrity": "sha512-DMD0KiN46eipeziST1LPP/STfDU0sufISXmjSgvVsoU2tqxctQeASejWcfNtxYKqETM1UxQ8sp2OrSBWpHY6sw=="
    },
    "aws-sdk": {
      "version": "2.1364.0",
      "resolved": "https://registry.npmjs.org/aws-sdk/-/aws-sdk-2.1364.0.tgz",
      "integrity": "sha512-PFoq9Rnu0DVi07wZ/SjKlrJDwso8AxE5q/ufLdNtINZPaSkB92OqKYVdlfQ4srsH2ala2NCrg8gFX98SCmqW3w==",
      "requires": {
        "buffer": "4.9.2",
        "events": "1.1.1",
        "ieee754": "1.1.13",
        "jmespath": "0.16.0",
        "querystring": "0.2.0",
        "sax": "1.2.1",
        "url": "0.10.3",
        "util": "^0.12.4",
        "uuid": "8.0.0",
        "xml2js": "0.5.0"
      },
      "dependencies": {
        "util": {
          "version": "0.12.5",
          "resolved": "https://registry.npmjs.org/util/-/util-0.12.5.tgz",
          "integrity": "sha512-kZf/K6hEIrWHI6XqOFUiiMa+79wE/D8Q+NCNAWclkyg3b4d2k7s0QGepNjiABc+aR3N1PAyHL7p6UcLY6LmrnA==",
          "requires": {
            "inherits": "^2.0.3",
            "is-arguments": "^1.0.4",
            "is-generator-function": "^1.0.7",
            "is-typed-array": "^1.1.3",
            "which-typed-array": "^1.1.2"
          }
        },
        "uuid": {
          "version": "8.0.0",
          "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.0.0.tgz",
          "integrity": "sha512-jOXGuXZAWdsTH7eZLtyXMqUb9EcWMGZNbL9YcGBJl4MH4nrxHmZJhEHvyLFrkxo+28uLb/NYRcStH48fnD0Vzw=="
        },
        "xml2js": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/xml2js/-/xml2js-0.5.0.tgz",
          "integrity": "sha512-drPFnkQJik/O+uPKpqSgr22mpuFHqKdbS835iAQrUC73L2F5WkboIRd63ai/2Yg6I1jzifPFKH2NTK+cfglkIA==",
          "requires": {
            "sax": ">=0.6.0",
            "xmlbuilder": "~11.0.0"
          }
        }
      }
    },
    "aws-sign2": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
      "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg="
    },
    "aws4": {
      "version": "1.11.0",
      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.11.0.tgz",
      "integrity": "sha512-xh1Rl34h6Fi1DC2WWKfxUTVqRsNnr6LsKz2+hfwDxQJWmrx8+c7ylaqBMcHfl1U1r2dsifOvKX3LQuLNZ+XSvA=="
    },
    "babel-code-frame": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-code-frame/-/babel-code-frame-6.26.0.tgz",
      "integrity": "sha1-Y/1D99weO7fONZR9uP42mj9Yx0s=",
      "dev": true,
      "requires": {
        "chalk": "^1.1.3",
        "esutils": "^2.0.2",
        "js-tokens": "^3.0.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
          "dev": true
        },
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          }
        },
        "escape-string-regexp": {
          "version": "1.0.5",
          "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
          "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ=",
          "dev": true
        },
        "js-tokens": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-3.0.2.tgz",
          "integrity": "sha1-mGbfOVECEw449/mWvOtlRDIJwls=",
          "dev": true
        },
        "strip-ansi": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
          "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "babel-core": {
      "version": "6.26.3",
      "resolved": "https://registry.npmjs.org/babel-core/-/babel-core-6.26.3.tgz",
      "integrity": "sha512-6jyFLuDmeidKmUEb3NM+/yawG0M2bDZ9Z1qbZP59cyHLz8kYGKYwpJP0UwUKKUiTRNvxfLesJnTedqczP7cTDA==",
      "dev": true,
      "requires": {
        "babel-code-frame": "^6.26.0",
        "babel-generator": "^6.26.0",
        "babel-helpers": "^6.24.1",
        "babel-messages": "^6.23.0",
        "babel-register": "^6.26.0",
        "babel-runtime": "^6.26.0",
        "babel-template": "^6.26.0",
        "babel-traverse": "^6.26.0",
        "babel-types": "^6.26.0",
        "babylon": "^6.18.0",
        "convert-source-map": "^1.5.1",
        "debug": "^2.6.9",
        "json5": "^0.5.1",
        "lodash": "^4.17.4",
        "minimatch": "^3.0.4",
        "path-is-absolute": "^1.0.1",
        "private": "^0.1.8",
        "slash": "^1.0.0",
        "source-map": "^0.5.7"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "json5": {
          "version": "0.5.1",
          "resolved": "https://registry.npmjs.org/json5/-/json5-0.5.1.tgz",
          "integrity": "sha1-Hq3nrMASA0rYTiOWdn6tn6VJWCE=",
          "dev": true
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g=",
          "dev": true
        }
      }
    },
    "babel-generator": {
      "version": "6.26.1",
      "resolved": "https://registry.npmjs.org/babel-generator/-/babel-generator-6.26.1.tgz",
      "integrity": "sha512-HyfwY6ApZj7BYTcJURpM5tznulaBvyio7/0d4zFOeMPUmfxkCjHocCuoLa2SAGzBI8AREcH3eP3758F672DppA==",
      "dev": true,
      "requires": {
        "babel-messages": "^6.23.0",
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "detect-indent": "^4.0.0",
        "jsesc": "^1.3.0",
        "lodash": "^4.17.4",
        "source-map": "^0.5.7",
        "trim-right": "^1.0.1"
      },
      "dependencies": {
        "jsesc": {
          "version": "1.3.0",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-1.3.0.tgz",
          "integrity": "sha1-RsP+yMGJKxKwgz25vHYiF226s0s=",
          "dev": true
        }
      }
    },
    "babel-helper-builder-binary-assignment-operator-visitor": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-builder-binary-assignment-operator-visitor/-/babel-helper-builder-binary-assignment-operator-visitor-6.24.1.tgz",
      "integrity": "sha1-zORReto1b0IgvK6KAsKzRvmlZmQ=",
      "dev": true,
      "requires": {
        "babel-helper-explode-assignable-expression": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-builder-react-jsx": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-helper-builder-react-jsx/-/babel-helper-builder-react-jsx-6.26.0.tgz",
      "integrity": "sha1-Of+DE7dci2Xc7/HzHTg+D/KkCKA=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "esutils": "^2.0.2"
      }
    },
    "babel-helper-call-delegate": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-call-delegate/-/babel-helper-call-delegate-6.24.1.tgz",
      "integrity": "sha1-7Oaqzdx25Bw0YfiL/Fdb0Nqi340=",
      "dev": true,
      "requires": {
        "babel-helper-hoist-variables": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-define-map": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-helper-define-map/-/babel-helper-define-map-6.26.0.tgz",
      "integrity": "sha1-pfVtq0GiX5fstJjH66ypgZ+Vvl8=",
      "dev": true,
      "requires": {
        "babel-helper-function-name": "^6.24.1",
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "lodash": "^4.17.4"
      }
    },
    "babel-helper-explode-assignable-expression": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-explode-assignable-expression/-/babel-helper-explode-assignable-expression-6.24.1.tgz",
      "integrity": "sha1-8luCz33BBDPFX3BZLVdGQArCLKo=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-function-name": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-function-name/-/babel-helper-function-name-6.24.1.tgz",
      "integrity": "sha1-00dbjAPtmCQqJbSDUasYOZ01gKk=",
      "dev": true,
      "requires": {
        "babel-helper-get-function-arity": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-get-function-arity": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-get-function-arity/-/babel-helper-get-function-arity-6.24.1.tgz",
      "integrity": "sha1-j3eCqpNAfEHTqlCQj4mwMbG2hT0=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-hoist-variables": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-hoist-variables/-/babel-helper-hoist-variables-6.24.1.tgz",
      "integrity": "sha1-HssnaJydJVE+rbyZFKc/VAi+enY=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-optimise-call-expression": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-optimise-call-expression/-/babel-helper-optimise-call-expression-6.24.1.tgz",
      "integrity": "sha1-96E0J7qfc/j0+pk8VKl4gtEkQlc=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-regex": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-helper-regex/-/babel-helper-regex-6.26.0.tgz",
      "integrity": "sha1-MlxZ+QL4LyS3T6zu0DY5VPZJXnI=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "lodash": "^4.17.4"
      }
    },
    "babel-helper-remap-async-to-generator": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-remap-async-to-generator/-/babel-helper-remap-async-to-generator-6.24.1.tgz",
      "integrity": "sha1-XsWBgnrXI/7N04HxySg5BnbkVRs=",
      "dev": true,
      "requires": {
        "babel-helper-function-name": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helper-replace-supers": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helper-replace-supers/-/babel-helper-replace-supers-6.24.1.tgz",
      "integrity": "sha1-v22/5Dk40XNpohPKiov3S2qQqxo=",
      "dev": true,
      "requires": {
        "babel-helper-optimise-call-expression": "^6.24.1",
        "babel-messages": "^6.23.0",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-helpers": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-helpers/-/babel-helpers-6.24.1.tgz",
      "integrity": "sha1-NHHenK7DiOXIUOWX5Yom3fN2ArI=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1"
      }
    },
    "babel-loader": {
      "version": "8.2.3",
      "resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-8.2.3.tgz",
      "integrity": "sha512-n4Zeta8NC3QAsuyiizu0GkmRcQ6clkV9WFUnUf1iXP//IeSKbWjofW3UHyZVwlOB4y039YQKefawyTn64Zwbuw==",
      "dev": true,
      "requires": {
        "find-cache-dir": "^3.3.1",
        "loader-utils": "^1.4.0",
        "make-dir": "^3.1.0",
        "schema-utils": "^2.6.5"
      }
    },
    "babel-messages": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-messages/-/babel-messages-6.23.0.tgz",
      "integrity": "sha1-8830cDhYA1sqKVHG7F7fbGLyYw4=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-check-es2015-constants": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-check-es2015-constants/-/babel-plugin-check-es2015-constants-6.22.0.tgz",
      "integrity": "sha1-NRV7EBQm/S/9PaP3XH0ekYNbv4o=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-dynamic-import-node": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/babel-plugin-dynamic-import-node/-/babel-plugin-dynamic-import-node-2.3.3.tgz",
      "integrity": "sha512-jZVI+s9Zg3IqA/kdi0i6UDCybUI3aSBLnglhYbSSjKlV7yF1F/5LWv8MakQmvYpnbJDS6fcBL2KzHSxNCMtWSQ==",
      "dev": true,
      "requires": {
        "object.assign": "^4.1.0"
      }
    },
    "babel-plugin-macros": {
      "version": "2.8.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-macros/-/babel-plugin-macros-2.8.0.tgz",
      "integrity": "sha512-SEP5kJpfGYqYKpBrj5XU3ahw5p5GOHJ0U5ssOSQ/WBVdwkD2Dzlce95exQTs3jOVWPPKLBN2rlEWkCK7dSmLvg==",
      "requires": {
        "@babel/runtime": "^7.7.2",
        "cosmiconfig": "^6.0.0",
        "resolve": "^1.12.0"
      }
    },
    "babel-plugin-polyfill-corejs2": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs2/-/babel-plugin-polyfill-corejs2-0.3.1.tgz",
      "integrity": "sha512-v7/T6EQcNfVLfcN2X8Lulb7DjprieyLWJK/zOWH5DUYcAgex9sP3h25Q+DLsX9TloXe3y1O8l2q2Jv9q8UVB9w==",
      "dev": true,
      "requires": {
        "@babel/compat-data": "^7.13.11",
        "@babel/helper-define-polyfill-provider": "^0.3.1",
        "semver": "^6.1.1"
      }
    },
    "babel-plugin-polyfill-corejs3": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/babel-plugin-polyfill-corejs3/-/babel-plugin-polyfill-corejs3-0.5.2.tgz",
      "integrity": "sha512-G3uJih0XWiID451fpeFaYGVuxHEjzKTHtc9uGFEjR6hHrvNzeS/PX+LLLcetJcytsB5m4j+K3o/EpXJNb/5IEQ==",
      "dev": true,
      "requires": {
        "@babel/helper-define-polyfill-provider": "^0.3.1",
        "core-js-compat": "^3.21.0"
      }
    },
    "babel-plugin-polyfill-regenerator": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-polyfill-regenerator/-/babel-plugin-polyfill-regenerator-0.3.1.tgz",
      "integrity": "sha512-Y2B06tvgHYt1x0yz17jGkGeeMr5FeKUu+ASJ+N6nB5lQ8Dapfg42i0OVrf8PNGJ3zKL4A23snMi1IRwrqqND7A==",
      "dev": true,
      "requires": {
        "@babel/helper-define-polyfill-provider": "^0.3.1"
      }
    },
    "babel-plugin-syntax-async-functions": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-async-functions/-/babel-plugin-syntax-async-functions-6.13.0.tgz",
      "integrity": "sha1-ytnK0RkbWtY0vzCuCHI5HgZHvpU=",
      "dev": true
    },
    "babel-plugin-syntax-exponentiation-operator": {
      "version": "6.13.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-exponentiation-operator/-/babel-plugin-syntax-exponentiation-operator-6.13.0.tgz",
      "integrity": "sha1-nufoM3KQ2pUoggGmpX9BcDF4MN4=",
      "dev": true
    },
    "babel-plugin-syntax-flow": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-flow/-/babel-plugin-syntax-flow-6.18.0.tgz",
      "integrity": "sha1-TDqyCiryaqIM0lmVw5jE63AxDI0=",
      "dev": true
    },
    "babel-plugin-syntax-jsx": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-jsx/-/babel-plugin-syntax-jsx-6.18.0.tgz",
      "integrity": "sha1-CvMqmm4Tyno/1QaeYtew9Y0NiUY=",
      "dev": true
    },
    "babel-plugin-syntax-trailing-function-commas": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-trailing-function-commas/-/babel-plugin-syntax-trailing-function-commas-6.22.0.tgz",
      "integrity": "sha1-ugNgk3+NBuQBgKQ/4NVhb/9TLPM=",
      "dev": true
    },
    "babel-plugin-transform-async-to-generator": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-async-to-generator/-/babel-plugin-transform-async-to-generator-6.24.1.tgz",
      "integrity": "sha1-ZTbjeK/2yx1VF6wOQOs+n8jQh2E=",
      "dev": true,
      "requires": {
        "babel-helper-remap-async-to-generator": "^6.24.1",
        "babel-plugin-syntax-async-functions": "^6.8.0",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-arrow-functions": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-arrow-functions/-/babel-plugin-transform-es2015-arrow-functions-6.22.0.tgz",
      "integrity": "sha1-RSaSy3EdX3ncf4XkQM5BufJE0iE=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-block-scoped-functions": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-block-scoped-functions/-/babel-plugin-transform-es2015-block-scoped-functions-6.22.0.tgz",
      "integrity": "sha1-u8UbSflk1wy42OC5ToICRs46YUE=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-block-scoping": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-block-scoping/-/babel-plugin-transform-es2015-block-scoping-6.26.0.tgz",
      "integrity": "sha1-1w9SmcEwjQXBL0Y4E7CgnnOxiV8=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "babel-template": "^6.26.0",
        "babel-traverse": "^6.26.0",
        "babel-types": "^6.26.0",
        "lodash": "^4.17.4"
      }
    },
    "babel-plugin-transform-es2015-classes": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-classes/-/babel-plugin-transform-es2015-classes-6.24.1.tgz",
      "integrity": "sha1-WkxYpQyclGHlZLSyo7+ryXolhNs=",
      "dev": true,
      "requires": {
        "babel-helper-define-map": "^6.24.1",
        "babel-helper-function-name": "^6.24.1",
        "babel-helper-optimise-call-expression": "^6.24.1",
        "babel-helper-replace-supers": "^6.24.1",
        "babel-messages": "^6.23.0",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-computed-properties": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-computed-properties/-/babel-plugin-transform-es2015-computed-properties-6.24.1.tgz",
      "integrity": "sha1-b+Ko0WiV1WNPTNmZttNICjCBWbM=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-destructuring": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-destructuring/-/babel-plugin-transform-es2015-destructuring-6.23.0.tgz",
      "integrity": "sha1-mXux8auWf2gtKwh2/jWNYOdlxW0=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-duplicate-keys": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-duplicate-keys/-/babel-plugin-transform-es2015-duplicate-keys-6.24.1.tgz",
      "integrity": "sha1-c+s9MQypaePvnskcU3QabxV2Qj4=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-for-of": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-for-of/-/babel-plugin-transform-es2015-for-of-6.23.0.tgz",
      "integrity": "sha1-9HyVsrYT3x0+zC/bdXNiPHUkhpE=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-function-name": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-function-name/-/babel-plugin-transform-es2015-function-name-6.24.1.tgz",
      "integrity": "sha1-g0yJhTvDaxrw86TF26qU/Y6sqos=",
      "dev": true,
      "requires": {
        "babel-helper-function-name": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-literals": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-literals/-/babel-plugin-transform-es2015-literals-6.22.0.tgz",
      "integrity": "sha1-T1SgLWzWbPkVKAAZox0xklN3yi4=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-modules-amd": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-amd/-/babel-plugin-transform-es2015-modules-amd-6.24.1.tgz",
      "integrity": "sha1-Oz5UAXI5hC1tGcMBHEvS8AoA0VQ=",
      "dev": true,
      "requires": {
        "babel-plugin-transform-es2015-modules-commonjs": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-modules-commonjs": {
      "version": "6.26.2",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-commonjs/-/babel-plugin-transform-es2015-modules-commonjs-6.26.2.tgz",
      "integrity": "sha512-CV9ROOHEdrjcwhIaJNBGMBCodN+1cfkwtM1SbUHmvyy35KGT7fohbpOxkE2uLz1o6odKK2Ck/tz47z+VqQfi9Q==",
      "dev": true,
      "requires": {
        "babel-plugin-transform-strict-mode": "^6.24.1",
        "babel-runtime": "^6.26.0",
        "babel-template": "^6.26.0",
        "babel-types": "^6.26.0"
      }
    },
    "babel-plugin-transform-es2015-modules-systemjs": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-systemjs/-/babel-plugin-transform-es2015-modules-systemjs-6.24.1.tgz",
      "integrity": "sha1-/4mhQrkRmpBhlfXxBuzzBdlAfSM=",
      "dev": true,
      "requires": {
        "babel-helper-hoist-variables": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-modules-umd": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-modules-umd/-/babel-plugin-transform-es2015-modules-umd-6.24.1.tgz",
      "integrity": "sha1-rJl+YoXNGO1hdq22B9YCNErThGg=",
      "dev": true,
      "requires": {
        "babel-plugin-transform-es2015-modules-amd": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-object-super": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-object-super/-/babel-plugin-transform-es2015-object-super-6.24.1.tgz",
      "integrity": "sha1-JM72muIcuDp/hgPa0CH1cusnj40=",
      "dev": true,
      "requires": {
        "babel-helper-replace-supers": "^6.24.1",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-parameters": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-parameters/-/babel-plugin-transform-es2015-parameters-6.24.1.tgz",
      "integrity": "sha1-V6w1GrScrxSpfNE7CfZv3wpiXys=",
      "dev": true,
      "requires": {
        "babel-helper-call-delegate": "^6.24.1",
        "babel-helper-get-function-arity": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-template": "^6.24.1",
        "babel-traverse": "^6.24.1",
        "babel-types": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-shorthand-properties": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-shorthand-properties/-/babel-plugin-transform-es2015-shorthand-properties-6.24.1.tgz",
      "integrity": "sha1-JPh11nIch2YbvZmkYi5R8U3jiqA=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-spread": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-spread/-/babel-plugin-transform-es2015-spread-6.22.0.tgz",
      "integrity": "sha1-1taKmfia7cRTbIGlQujdnxdG+NE=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-sticky-regex": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-sticky-regex/-/babel-plugin-transform-es2015-sticky-regex-6.24.1.tgz",
      "integrity": "sha1-AMHNsaynERLN8M9hJsLta0V8zbw=",
      "dev": true,
      "requires": {
        "babel-helper-regex": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-plugin-transform-es2015-template-literals": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-template-literals/-/babel-plugin-transform-es2015-template-literals-6.22.0.tgz",
      "integrity": "sha1-qEs0UPfp+PH2g51taH2oS7EjbY0=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-typeof-symbol": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-typeof-symbol/-/babel-plugin-transform-es2015-typeof-symbol-6.23.0.tgz",
      "integrity": "sha1-3sCfHN3/lLUqxz1QXITfWdzOs3I=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-es2015-unicode-regex": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-es2015-unicode-regex/-/babel-plugin-transform-es2015-unicode-regex-6.24.1.tgz",
      "integrity": "sha1-04sS9C6nMj9yk4fxinxa4frrNek=",
      "dev": true,
      "requires": {
        "babel-helper-regex": "^6.24.1",
        "babel-runtime": "^6.22.0",
        "regexpu-core": "^2.0.0"
      },
      "dependencies": {
        "jsesc": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
          "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0=",
          "dev": true
        },
        "regexpu-core": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-2.0.0.tgz",
          "integrity": "sha1-SdA4g3uNz4v6W5pCE5k45uoq4kA=",
          "dev": true,
          "requires": {
            "regenerate": "^1.2.1",
            "regjsgen": "^0.2.0",
            "regjsparser": "^0.1.4"
          }
        },
        "regjsgen": {
          "version": "0.2.0",
          "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.2.0.tgz",
          "integrity": "sha1-bAFq3qxVT3WCP+N6wFuS1aTtsfc=",
          "dev": true
        },
        "regjsparser": {
          "version": "0.1.5",
          "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.1.5.tgz",
          "integrity": "sha1-fuj4Tcb6eS0/0K4ijSS9lJ6tIFw=",
          "dev": true,
          "requires": {
            "jsesc": "~0.5.0"
          }
        }
      }
    },
    "babel-plugin-transform-exponentiation-operator": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-exponentiation-operator/-/babel-plugin-transform-exponentiation-operator-6.24.1.tgz",
      "integrity": "sha1-KrDJx/MJj6SJB3cruBP+QejeOg4=",
      "dev": true,
      "requires": {
        "babel-helper-builder-binary-assignment-operator-visitor": "^6.24.1",
        "babel-plugin-syntax-exponentiation-operator": "^6.8.0",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-flow-strip-types": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-flow-strip-types/-/babel-plugin-transform-flow-strip-types-6.22.0.tgz",
      "integrity": "sha1-hMtnKTXUNxT9wyvOhFaNh0Qc988=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-flow": "^6.18.0",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-react-display-name": {
      "version": "6.25.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-display-name/-/babel-plugin-transform-react-display-name-6.25.0.tgz",
      "integrity": "sha1-Z+K/Hx6ck6sI25Z5LgU5K/LMKNE=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-react-jsx": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-jsx/-/babel-plugin-transform-react-jsx-6.24.1.tgz",
      "integrity": "sha1-hAoCjn30YN/DotKfDA2R9jduZqM=",
      "dev": true,
      "requires": {
        "babel-helper-builder-react-jsx": "^6.24.1",
        "babel-plugin-syntax-jsx": "^6.8.0",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-react-jsx-self": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-jsx-self/-/babel-plugin-transform-react-jsx-self-6.22.0.tgz",
      "integrity": "sha1-322AqdomEqEh5t3XVYvL7PBuY24=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-jsx": "^6.8.0",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-react-jsx-source": {
      "version": "6.22.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-jsx-source/-/babel-plugin-transform-react-jsx-source-6.22.0.tgz",
      "integrity": "sha1-ZqwSFT9c0tF7PBkmj0vwGX9E7NY=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-jsx": "^6.8.0",
        "babel-runtime": "^6.22.0"
      }
    },
    "babel-plugin-transform-regenerator": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-regenerator/-/babel-plugin-transform-regenerator-6.26.0.tgz",
      "integrity": "sha1-4HA2lvveJ/Cj78rPi03KL3s6jy8=",
      "dev": true,
      "requires": {
        "regenerator-transform": "^0.10.0"
      },
      "dependencies": {
        "regenerator-transform": {
          "version": "0.10.1",
          "resolved": "https://registry.npmjs.org/regenerator-transform/-/regenerator-transform-0.10.1.tgz",
          "integrity": "sha512-PJepbvDbuK1xgIgnau7Y90cwaAmO/LCLMI2mPvaXq2heGMR3aWW5/BQvYrhJ8jgmQjXewXvBjzfqKcVOmhjZ6Q==",
          "dev": true,
          "requires": {
            "babel-runtime": "^6.18.0",
            "babel-types": "^6.19.0",
            "private": "^0.1.6"
          }
        }
      }
    },
    "babel-plugin-transform-strict-mode": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-transform-strict-mode/-/babel-plugin-transform-strict-mode-6.24.1.tgz",
      "integrity": "sha1-1fr3qleKZbvlkc9e2uBKDGcCB1g=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.22.0",
        "babel-types": "^6.24.1"
      }
    },
    "babel-preset-env": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/babel-preset-env/-/babel-preset-env-1.7.0.tgz",
      "integrity": "sha512-9OR2afuKDneX2/q2EurSftUYM0xGu4O2D9adAhVfADDhrYDaxXV0rBbevVYoY9n6nyX1PmQW/0jtpJvUNr9CHg==",
      "dev": true,
      "requires": {
        "babel-plugin-check-es2015-constants": "^6.22.0",
        "babel-plugin-syntax-trailing-function-commas": "^6.22.0",
        "babel-plugin-transform-async-to-generator": "^6.22.0",
        "babel-plugin-transform-es2015-arrow-functions": "^6.22.0",
        "babel-plugin-transform-es2015-block-scoped-functions": "^6.22.0",
        "babel-plugin-transform-es2015-block-scoping": "^6.23.0",
        "babel-plugin-transform-es2015-classes": "^6.23.0",
        "babel-plugin-transform-es2015-computed-properties": "^6.22.0",
        "babel-plugin-transform-es2015-destructuring": "^6.23.0",
        "babel-plugin-transform-es2015-duplicate-keys": "^6.22.0",
        "babel-plugin-transform-es2015-for-of": "^6.23.0",
        "babel-plugin-transform-es2015-function-name": "^6.22.0",
        "babel-plugin-transform-es2015-literals": "^6.22.0",
        "babel-plugin-transform-es2015-modules-amd": "^6.22.0",
        "babel-plugin-transform-es2015-modules-commonjs": "^6.23.0",
        "babel-plugin-transform-es2015-modules-systemjs": "^6.23.0",
        "babel-plugin-transform-es2015-modules-umd": "^6.23.0",
        "babel-plugin-transform-es2015-object-super": "^6.22.0",
        "babel-plugin-transform-es2015-parameters": "^6.23.0",
        "babel-plugin-transform-es2015-shorthand-properties": "^6.22.0",
        "babel-plugin-transform-es2015-spread": "^6.22.0",
        "babel-plugin-transform-es2015-sticky-regex": "^6.22.0",
        "babel-plugin-transform-es2015-template-literals": "^6.22.0",
        "babel-plugin-transform-es2015-typeof-symbol": "^6.23.0",
        "babel-plugin-transform-es2015-unicode-regex": "^6.22.0",
        "babel-plugin-transform-exponentiation-operator": "^6.22.0",
        "babel-plugin-transform-regenerator": "^6.22.0",
        "browserslist": "^3.2.6",
        "invariant": "^2.2.2",
        "semver": "^5.3.0"
      },
      "dependencies": {
        "browserslist": {
          "version": "3.2.8",
          "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-3.2.8.tgz",
          "integrity": "sha512-WHVocJYavUwVgVViC0ORikPHQquXwVh939TaelZ4WDqpWgTX/FsGhl/+P4qBUAGcRvtOgDgC+xftNWWp2RUTAQ==",
          "dev": true,
          "requires": {
            "caniuse-lite": "^1.0.30000844",
            "electron-to-chromium": "^1.3.47"
          }
        },
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
          "dev": true
        }
      }
    },
    "babel-preset-flow": {
      "version": "6.23.0",
      "resolved": "https://registry.npmjs.org/babel-preset-flow/-/babel-preset-flow-6.23.0.tgz",
      "integrity": "sha1-5xIYiHCFrpoktb5Baa/7WZgWxJ0=",
      "dev": true,
      "requires": {
        "babel-plugin-transform-flow-strip-types": "^6.22.0"
      }
    },
    "babel-preset-react": {
      "version": "6.24.1",
      "resolved": "https://registry.npmjs.org/babel-preset-react/-/babel-preset-react-6.24.1.tgz",
      "integrity": "sha1-umnfrqRfw+xjm2pOzqbhdwLJE4A=",
      "dev": true,
      "requires": {
        "babel-plugin-syntax-jsx": "^6.3.13",
        "babel-plugin-transform-react-display-name": "^6.23.0",
        "babel-plugin-transform-react-jsx": "^6.24.1",
        "babel-plugin-transform-react-jsx-self": "^6.22.0",
        "babel-plugin-transform-react-jsx-source": "^6.22.0",
        "babel-preset-flow": "^6.23.0"
      }
    },
    "babel-register": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-register/-/babel-register-6.26.0.tgz",
      "integrity": "sha1-btAhFz4vy0htestFxgCahW9kcHE=",
      "dev": true,
      "requires": {
        "babel-core": "^6.26.0",
        "babel-runtime": "^6.26.0",
        "core-js": "^2.5.0",
        "home-or-tmp": "^2.0.0",
        "lodash": "^4.17.4",
        "mkdirp": "^0.5.1",
        "source-map-support": "^0.4.15"
      },
      "dependencies": {
        "core-js": {
          "version": "2.6.12",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.12.tgz",
          "integrity": "sha512-Kb2wC0fvsWfQrgk8HU5lW6U/Lcs8+9aaYcy4ZFc6DDlo4nZ7n70dEgE5rtR0oG6ufKDUnrwfWL1mXR5ljDatrQ==",
          "dev": true
        },
        "source-map-support": {
          "version": "0.4.18",
          "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.4.18.tgz",
          "integrity": "sha512-try0/JqxPLF9nOjvSta7tVondkP5dwgyLDjVoyMDlmjugT2lRZ1OfsrYTkCd2hkDnJTKRbO/Rl3orm8vlsUzbA==",
          "dev": true,
          "requires": {
            "source-map": "^0.5.6"
          }
        }
      }
    },
    "babel-runtime": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
      "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
      "dev": true,
      "requires": {
        "core-js": "^2.4.0",
        "regenerator-runtime": "^0.11.0"
      },
      "dependencies": {
        "core-js": {
          "version": "2.6.12",
          "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.12.tgz",
          "integrity": "sha512-Kb2wC0fvsWfQrgk8HU5lW6U/Lcs8+9aaYcy4ZFc6DDlo4nZ7n70dEgE5rtR0oG6ufKDUnrwfWL1mXR5ljDatrQ==",
          "dev": true
        },
        "regenerator-runtime": {
          "version": "0.11.1",
          "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
          "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg==",
          "dev": true
        }
      }
    },
    "babel-template": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-template/-/babel-template-6.26.0.tgz",
      "integrity": "sha1-3gPi0WOWsGn0bdn/+FIfsaDjXgI=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "babel-traverse": "^6.26.0",
        "babel-types": "^6.26.0",
        "babylon": "^6.18.0",
        "lodash": "^4.17.4"
      }
    },
    "babel-traverse": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-traverse/-/babel-traverse-6.26.0.tgz",
      "integrity": "sha1-RqnL1+3MYsjlwGTi0tjQ9ANXZu4=",
      "dev": true,
      "requires": {
        "babel-code-frame": "^6.26.0",
        "babel-messages": "^6.23.0",
        "babel-runtime": "^6.26.0",
        "babel-types": "^6.26.0",
        "babylon": "^6.18.0",
        "debug": "^2.6.8",
        "globals": "^9.18.0",
        "invariant": "^2.2.2",
        "lodash": "^4.17.4"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "globals": {
          "version": "9.18.0",
          "resolved": "https://registry.npmjs.org/globals/-/globals-9.18.0.tgz",
          "integrity": "sha512-S0nG3CLEQiY/ILxqtztTWH/3iRRdyBLw6KMDxnKMchrtbj2OFmehVh0WUCfW3DUrIgx/qFrJPICrq4Z4sTR9UQ==",
          "dev": true
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g=",
          "dev": true
        }
      }
    },
    "babel-types": {
      "version": "6.26.0",
      "resolved": "https://registry.npmjs.org/babel-types/-/babel-types-6.26.0.tgz",
      "integrity": "sha1-o7Bz+Uq0nrb6Vc1lInozQ4BjJJc=",
      "dev": true,
      "requires": {
        "babel-runtime": "^6.26.0",
        "esutils": "^2.0.2",
        "lodash": "^4.17.4",
        "to-fast-properties": "^1.0.3"
      },
      "dependencies": {
        "to-fast-properties": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-1.0.3.tgz",
          "integrity": "sha1-uDVx+k2MJbguIxsG46MFXeTKGkc=",
          "dev": true
        }
      }
    },
    "babylon": {
      "version": "6.18.0",
      "resolved": "https://registry.npmjs.org/babylon/-/babylon-6.18.0.tgz",
      "integrity": "sha512-q/UEjfGJ2Cm3oKV71DJz9d25TPnq5rhBVL2Q4fA5wcC3jcrdn7+SssEybFIxwAvvP+YCsCYNKughoF33GxgycQ==",
      "dev": true
    },
    "backo2": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/backo2/-/backo2-1.0.2.tgz",
      "integrity": "sha512-zj6Z6M7Eq+PBZ7PQxl5NT665MvJdAkzp0f60nAJ+sLaSCBPMwVak5ZegFbgVCzFcCJTKFoMizvM5Ld7+JrRJHA=="
    },
    "balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw=="
    },
    "base": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
      "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
      "dev": true,
      "requires": {
        "cache-base": "^1.0.1",
        "class-utils": "^0.3.5",
        "component-emitter": "^1.2.1",
        "define-property": "^1.0.0",
        "isobject": "^3.0.1",
        "mixin-deep": "^1.2.0",
        "pascalcase": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        }
      }
    },
    "base64-arraybuffer": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/base64-arraybuffer/-/base64-arraybuffer-0.1.4.tgz",
      "integrity": "sha512-a1eIFi4R9ySrbiMuyTGx5e92uRH5tQY6kArNcFaKBUleIoLjdjBg7Zxm3Mqm3Kmkf27HLR/1fnxX9q8GQ7Iavg=="
    },
    "base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA=="
    },
    "base64id": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/base64id/-/base64id-2.0.0.tgz",
      "integrity": "sha512-lGe34o6EHj9y3Kts9R4ZYs/Gr+6N7MCaMlIFA3F1R2O5/m7K06AxfSeO5530PEERE6/WyEg3lsuyw4GHlPZHog=="
    },
    "bcrypt": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/bcrypt/-/bcrypt-5.1.0.tgz",
      "integrity": "sha512-RHBS7HI5N5tEnGTmtR/pppX0mmDSBpQ4aCBsj7CEQfYXDcO74A8sIBYcJMuCsis2E81zDxeENYhv66oZwLiA+Q==",
      "requires": {
        "@mapbox/node-pre-gyp": "^1.0.10",
        "node-addon-api": "^5.0.0"
      }
    },
    "bcrypt-pbkdf": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
      "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
      "requires": {
        "tweetnacl": "^0.14.3"
      }
    },
    "bfj": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/bfj/-/bfj-6.1.2.tgz",
      "integrity": "sha512-BmBJa4Lip6BPRINSZ0BPEIfB1wUY/9rwbwvIHQA1KjX9om29B6id0wnWXq7m3bn5JrUVjeOTnVuhPT1FiHwPGw==",
      "dev": true,
      "requires": {
        "bluebird": "^3.5.5",
        "check-types": "^8.0.3",
        "hoopy": "^0.1.4",
        "tryer": "^1.0.1"
      }
    },
    "big.js": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
      "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ==",
      "dev": true
    },
    "bignumber.js": {
      "version": "9.1.1",
      "resolved": "https://registry.npmjs.org/bignumber.js/-/bignumber.js-9.1.1.tgz",
      "integrity": "sha512-pHm4LsMJ6lzgNGVfZHjMoO8sdoRhOzOH4MLmY65Jg70bpxCKu5iOHNJyfF6OyvYw7t8Fpf35RuzUyqnQsj8Vig=="
    },
    "binary-extensions": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.2.0.tgz",
      "integrity": "sha512-jDctJ/IVQbZoJykoeHbhXpOlNBqGNcwXJKJog42E5HDPUwQTSdjCHdihjj0DlnheQ7blbT6dHOafNAiS8ooQKA==",
      "dev": true,
      "optional": true
    },
    "bindings": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
      "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
      "dev": true,
      "optional": true,
      "requires": {
        "file-uri-to-path": "1.0.0"
      }
    },
    "bl": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bl/-/bl-4.1.0.tgz",
      "integrity": "sha512-1W07cM9gS6DcLperZfFSj+bWLtaPGSOHWhPiGzXmvVJbRLdG82sH/Kn8EtW1VqWVA54AKf2h5k5BbnIbwF3h6w==",
      "requires": {
        "buffer": "^5.5.0",
        "inherits": "^2.0.4",
        "readable-stream": "^3.4.0"
      },
      "dependencies": {
        "buffer": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
          "integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
          "requires": {
            "base64-js": "^1.3.1",
            "ieee754": "^1.1.13"
          }
        }
      }
    },
    "blob": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/blob/-/blob-0.0.5.tgz",
      "integrity": "sha512-gaqbzQPqOoamawKg0LGVd7SzLgXS+JH61oWprSLH+P+abTczqJbhTR8CmJ2u9/bUYNmHTGJx/UEmn6doAvvuig=="
    },
    "block-stream": {
      "version": "0.0.9",
      "resolved": "https://registry.npmjs.org/block-stream/-/block-stream-0.0.9.tgz",
      "integrity": "sha1-E+v+d4oDIFz+A3UUgeu0szAMEmo=",
      "dev": true,
      "requires": {
        "inherits": "~2.0.0"
      }
    },
    "bluebird": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
      "integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg==",
      "dev": true
    },
    "bn.js": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-5.2.0.tgz",
      "integrity": "sha512-D7iWRBvnZE8ecXiLj/9wbxH7Tk79fAh8IHaTNq1RWRixsS02W+5qS+iE9yq6RYl0asXx5tw0bLhmT5pIfbSquw==",
      "dev": true
    },
    "body-parser": {
      "version": "1.19.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.19.2.tgz",
      "integrity": "sha512-SAAwOxgoCKMGs9uUAUFHygfLAyaniaoun6I8mFY9pRAJL9+Kec34aU+oIjDhTycub1jozEfEwx1W1IuOYxVSFw==",
      "requires": {
        "bytes": "3.1.2",
        "content-type": "~1.0.4",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "http-errors": "1.8.1",
        "iconv-lite": "0.4.24",
        "on-finished": "~2.3.0",
        "qs": "6.9.7",
        "raw-body": "2.4.3",
        "type-is": "~1.6.18"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        }
      }
    },
    "boolbase": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
      "integrity": "sha512-JZOSA7Mo9sNGB8+UjSgzdLtokWAky1zbztM3WRLCbZ70/3cTANmQmOdR7y2g+J0e2WXywy1yS468tY+IruqEww=="
    },
    "brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "requires": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
      "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
      "dev": true,
      "requires": {
        "arr-flatten": "^1.1.0",
        "array-unique": "^0.3.2",
        "extend-shallow": "^2.0.1",
        "fill-range": "^4.0.0",
        "isobject": "^3.0.1",
        "repeat-element": "^1.1.2",
        "snapdragon": "^0.8.1",
        "snapdragon-node": "^2.0.1",
        "split-string": "^3.0.2",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        }
      }
    },
    "brorand": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
      "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8=",
      "dev": true
    },
    "browser-process-hrtime": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/browser-process-hrtime/-/browser-process-hrtime-1.0.0.tgz",
      "integrity": "sha512-9o5UecI3GhkpM6DrXr69PblIuWxPKk9Y0jHBRhdocZ2y7YECBFCsHm79Pr3OyR2AvjhDkabFJaDJMYRazHgsow=="
    },
    "browserify-aes": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
      "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
      "dev": true,
      "requires": {
        "buffer-xor": "^1.0.3",
        "cipher-base": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.3",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "browserify-cipher": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
      "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
      "dev": true,
      "requires": {
        "browserify-aes": "^1.0.4",
        "browserify-des": "^1.0.0",
        "evp_bytestokey": "^1.0.0"
      }
    },
    "browserify-des": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
      "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.1",
        "des.js": "^1.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "browserify-rsa": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.1.0.tgz",
      "integrity": "sha512-AdEER0Hkspgno2aR97SAf6vi0y0k8NuOpGnVH3O99rcA5Q6sh8QxcngtHuJ6uXwnfAXNM4Gn1Gb7/MV1+Ymbog==",
      "dev": true,
      "requires": {
        "bn.js": "^5.0.0",
        "randombytes": "^2.0.1"
      }
    },
    "browserify-sign": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.2.1.tgz",
      "integrity": "sha512-/vrA5fguVAKKAVTNJjgSm1tRQDHUU6DbwO9IROu/0WAzC8PKhucDSh18J0RMvVeHAn5puMd+QHC2erPRNf8lmg==",
      "dev": true,
      "requires": {
        "bn.js": "^5.1.1",
        "browserify-rsa": "^4.0.1",
        "create-hash": "^1.2.0",
        "create-hmac": "^1.1.7",
        "elliptic": "^6.5.3",
        "inherits": "^2.0.4",
        "parse-asn1": "^5.1.5",
        "readable-stream": "^3.6.0",
        "safe-buffer": "^5.2.0"
      },
      "dependencies": {
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
          "dev": true
        }
      }
    },
    "browserify-zlib": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
      "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
      "dev": true,
      "requires": {
        "pako": "~1.0.5"
      }
    },
    "browserslist": {
      "version": "4.19.3",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.19.3.tgz",
      "integrity": "sha512-XK3X4xtKJ+Txj8G5c30B4gsm71s69lqXlkYui4s6EkKxuv49qjYlY6oVd+IFJ73d4YymtM3+djvvt/R/iJwwDg==",
      "dev": true,
      "requires": {
        "caniuse-lite": "^1.0.30001312",
        "electron-to-chromium": "^1.4.71",
        "escalade": "^3.1.1",
        "node-releases": "^2.0.2",
        "picocolors": "^1.0.0"
      }
    },
    "buffer": {
      "version": "4.9.2",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.2.tgz",
      "integrity": "sha512-xq+q3SRMOxGivLhBNaUdC64hDTQwejJ+H0T/NB1XMtTVEwNTrfFF3gAxiyW0Bu/xWEGhjVKgUcMhCrUy2+uCWg==",
      "requires": {
        "base64-js": "^1.0.2",
        "ieee754": "^1.1.4",
        "isarray": "^1.0.0"
      }
    },
    "buffer-crc32": {
      "version": "0.2.13",
      "resolved": "https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.13.tgz",
      "integrity": "sha1-DTM+PwDqxQqhRUq9MO+MKl2ackI=",
      "dev": true
    },
    "buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA=="
    },
    "buffer-from": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-0.1.2.tgz",
      "integrity": "sha512-RiWIenusJsmI2KcvqQABB83tLxCByE3upSP8QU3rJDMVFGPWLvPQJt/O1Su9moRWeH7d+Q2HYb68f6+v+tw2vg=="
    },
    "buffer-writer": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/buffer-writer/-/buffer-writer-2.0.0.tgz",
      "integrity": "sha512-a7ZpuTZU1TRtnwyCNW3I5dc0wWNC3VR9S++Ewyk2HHZdrO3CQJqSpd+95Us590V6AL7JqUAH2IwZ/398PmNFgw=="
    },
    "buffer-xor": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
      "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk=",
      "dev": true
    },
    "builtin-modules": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-1.1.1.tgz",
      "integrity": "sha1-Jw8HbFpywC9bZaR9+Uxf46J4iS8=",
      "dev": true
    },
    "builtin-status-codes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
      "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug=",
      "dev": true
    },
    "busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "requires": {
        "streamsearch": "^1.1.0"
      }
    },
    "bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg=="
    },
    "cacache": {
      "version": "12.0.4",
      "resolved": "https://registry.npmjs.org/cacache/-/cacache-12.0.4.tgz",
      "integrity": "sha512-a0tMB40oefvuInr4Cwb3GerbL9xTj1D5yg0T5xrjGCGyfvbxseIXX7BAO/u/hIXdafzOI5JC3wDwHyf24buOAQ==",
      "dev": true,
      "requires": {
        "bluebird": "^3.5.5",
        "chownr": "^1.1.1",
        "figgy-pudding": "^3.5.1",
        "glob": "^7.1.4",
        "graceful-fs": "^4.1.15",
        "infer-owner": "^1.0.3",
        "lru-cache": "^5.1.1",
        "mississippi": "^3.0.0",
        "mkdirp": "^0.5.1",
        "move-concurrently": "^1.0.1",
        "promise-inflight": "^1.0.1",
        "rimraf": "^2.6.3",
        "ssri": "^6.0.1",
        "unique-filename": "^1.1.1",
        "y18n": "^4.0.0"
      },
      "dependencies": {
        "chownr": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
          "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
          "dev": true
        },
        "lru-cache": {
          "version": "5.1.1",
          "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
          "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
          "dev": true,
          "requires": {
            "yallist": "^3.0.2"
          }
        },
        "rimraf": {
          "version": "2.7.1",
          "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
          "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
          "dev": true,
          "requires": {
            "glob": "^7.1.3"
          }
        },
        "yallist": {
          "version": "3.1.1",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
          "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
          "dev": true
        }
      }
    },
    "cache-base": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
      "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
      "dev": true,
      "requires": {
        "collection-visit": "^1.0.0",
        "component-emitter": "^1.2.1",
        "get-value": "^2.0.6",
        "has-value": "^1.0.0",
        "isobject": "^3.0.1",
        "set-value": "^2.0.0",
        "to-object-path": "^0.3.0",
        "union-value": "^1.0.0",
        "unset-value": "^1.0.0"
      }
    },
    "call-bind": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.2.tgz",
      "integrity": "sha512-7O+FbCihrB5WGbFYesctwmTKae6rOiIzmz1icreWJ+0aA7LJfuqhEso2T9ncpcFtzMQtzXf2QGGueWJGTYsqrA==",
      "requires": {
        "function-bind": "^1.1.1",
        "get-intrinsic": "^1.0.2"
      }
    },
    "callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="
    },
    "camel-case": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/camel-case/-/camel-case-3.0.0.tgz",
      "integrity": "sha512-+MbKztAYHXPr1jNTSKQF52VpcFjwY5RkR7fxksV8Doo4KAYc5Fl4UJRgthBbTmEx8C54DqahhbLJkDwjI3PI/w==",
      "requires": {
        "no-case": "^2.2.0",
        "upper-case": "^1.1.1"
      }
    },
    "camelcase": {
      "version": "5.3.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
      "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
      "dev": true
    },
    "camelcase-keys": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/camelcase-keys/-/camelcase-keys-2.1.0.tgz",
      "integrity": "sha1-MIvur/3ygRkFHvodkyITyRuPkuc=",
      "dev": true,
      "requires": {
        "camelcase": "^2.0.0",
        "map-obj": "^1.0.0"
      },
      "dependencies": {
        "camelcase": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-2.1.1.tgz",
          "integrity": "sha1-fB0W1nmhu+WcoCys7PsBHiAfWh8=",
          "dev": true
        }
      }
    },
    "caniuse-lite": {
      "version": "1.0.30001312",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001312.tgz",
      "integrity": "sha512-Wiz1Psk2MEK0pX3rUzWaunLTZzqS2JYZFzNKqAiJGiuxIjRPLgV6+VDPOg6lQOUxmDwhTlh198JsTTi8Hzw6aQ==",
      "dev": true
    },
    "caseless": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
      "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
    },
    "chalk": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
      "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
      "requires": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      },
      "dependencies": {
        "escape-string-regexp": {
          "version": "1.0.5",
          "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
          "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ="
        }
      }
    },
    "check-types": {
      "version": "8.0.3",
      "resolved": "https://registry.npmjs.org/check-types/-/check-types-8.0.3.tgz",
      "integrity": "sha512-YpeKZngUmG65rLudJ4taU7VLkOCTMhNl/u4ctNC56LQS/zJTyNH0Lrtwm1tfTsbLlwvlfsA2d1c8vCf/Kh2KwQ==",
      "dev": true
    },
    "chokidar": {
      "version": "3.5.3",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.5.3.tgz",
      "integrity": "sha512-Dr3sfKRP6oTcjf2JmUmFJfeVMvXBdegxB0iVQ5eb2V10uFJUCAS8OByZdVAyVb8xXNz3GjjTgj9kLWsZTqE6kw==",
      "dev": true,
      "optional": true,
      "requires": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "fsevents": "~2.3.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "dependencies": {
        "braces": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
          "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
          "dev": true,
          "optional": true,
          "requires": {
            "fill-range": "^7.0.1"
          }
        },
        "fill-range": {
          "version": "7.0.1",
          "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
          "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
          "dev": true,
          "optional": true,
          "requires": {
            "to-regex-range": "^5.0.1"
          }
        },
        "is-number": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
          "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
          "dev": true,
          "optional": true
        },
        "to-regex-range": {
          "version": "5.0.1",
          "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
          "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
          "dev": true,
          "optional": true,
          "requires": {
            "is-number": "^7.0.0"
          }
        }
      }
    },
    "chownr": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-2.0.0.tgz",
      "integrity": "sha512-bIomtDF5KGpdogkLd9VspvFzk9KfpyyGlS8YFVZl7TGPBHL5snIOnxeshwVgPteQ9b4Eydl+pVbIyE1DcvCWgQ=="
    },
    "chrome-trace-event": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.3.tgz",
      "integrity": "sha512-p3KULyQg4S7NIHixdwbGX+nFHkoBiA4YQmyWtjb8XngSKV124nJmRysgAeujbUVb15vh+RvFUfCPqU7rXk+hZg==",
      "dev": true
    },
    "cipher-base": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
      "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "class-utils": {
      "version": "0.3.6",
      "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
      "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
      "dev": true,
      "requires": {
        "arr-union": "^3.1.0",
        "define-property": "^0.2.5",
        "isobject": "^3.0.0",
        "static-extend": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^0.1.6",
            "is-data-descriptor": "^0.1.4",
            "kind-of": "^5.0.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "clean-css": {
      "version": "4.2.4",
      "resolved": "https://registry.npmjs.org/clean-css/-/clean-css-4.2.4.tgz",
      "integrity": "sha512-EJUDT7nDVFDvaQgAo2G/PJvxmp1o/c6iXLbswsBbUFXi1Nr+AjA2cKmfbKDMjMvzEe75g3P6JkaDDAKk96A85A==",
      "requires": {
        "source-map": "~0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "cliui": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
      "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
      "dev": true,
      "requires": {
        "string-width": "^3.1.0",
        "strip-ansi": "^5.2.0",
        "wrap-ansi": "^5.1.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
          "dev": true
        },
        "emoji-regex": {
          "version": "7.0.3",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
          "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA==",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
          "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
          "dev": true,
          "requires": {
            "emoji-regex": "^7.0.1",
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^5.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "dev": true,
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "clone-deep": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-4.0.1.tgz",
      "integrity": "sha512-neHB9xuzh/wk0dIHweyAXv2aPGZIVk3pLMe+/RNzINf17fe0OG96QroktYAUm7SM1PBnzTabaLboqqxDyMU+SQ==",
      "dev": true,
      "requires": {
        "is-plain-object": "^2.0.4",
        "kind-of": "^6.0.2",
        "shallow-clone": "^3.0.0"
      }
    },
    "clsx": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-1.1.1.tgz",
      "integrity": "sha512-6/bPho624p3S2pMyvP5kKBPXnI3ufHLObBFCfgx+LkeR5lg2XYy2hqZqUf45ypD8COn2bhgGJSUE+l5dhNBieA=="
    },
    "coa": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/coa/-/coa-2.0.2.tgz",
      "integrity": "sha512-q5/jG+YQnSy4nRTV4F7lPepBJZ8qBNJJDBuJdoejDyLXgmL7IEo+Le2JDZudFTFt7mrCqIRaSjws4ygRCTCAXA==",
      "requires": {
        "@types/q": "^1.5.1",
        "chalk": "^2.4.1",
        "q": "^1.1.2"
      }
    },
    "code-point-at": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/code-point-at/-/code-point-at-1.1.0.tgz",
      "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c="
    },
    "collection-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
      "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
      "dev": true,
      "requires": {
        "map-visit": "^1.0.0",
        "object-visit": "^1.0.0"
      }
    },
    "color": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/color/-/color-3.2.1.tgz",
      "integrity": "sha512-aBl7dZI9ENN6fUGC7mWpMTPNHmWUSNan9tuWN6ahh5ZLNk9baLJOnSMlrQkHcrfFgz2/RigjUVAjdx36VcemKA==",
      "requires": {
        "color-convert": "^1.9.3",
        "color-string": "^1.6.0"
      }
    },
    "color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU="
    },
    "color-string": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/color-string/-/color-string-1.9.1.tgz",
      "integrity": "sha512-shrVawQFojnZv6xM40anx4CkoDP+fZsw/ZerEMsW/pyzsRbElpsL/DBVW7q3ExxwusdNXI3lXpuhEZkzs8p5Eg==",
      "requires": {
        "color-name": "^1.0.0",
        "simple-swizzle": "^0.2.2"
      }
    },
    "color-support": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-support/-/color-support-1.1.3.tgz",
      "integrity": "sha512-qiBjkpbMLO/HL68y+lh4q0/O1MZFj2RX6X/KmMa3+gJD3z+WwI1ZzDHysvqHGS3mP6mznPckpXmw1nI9cJjyRg=="
    },
    "colors": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/colors/-/colors-1.4.0.tgz",
      "integrity": "sha512-a+UqTh4kgZg/SlGvfbzDHpgRu7AAQOmmqRHJnxhRZICKFUT91brVhNNt58CMWU9PsBbv3PDCZUHbVxuDiH2mtA=="
    },
    "colorspace": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/colorspace/-/colorspace-1.1.4.tgz",
      "integrity": "sha512-BgvKJiuVu1igBUF2kEjRCZXol6wiiGbY5ipL/oVPwm0BL9sIpMIzM8IK7vwuxIIzOXMV3Ey5w+vxhm0rR/TN8w==",
      "requires": {
        "color": "^3.1.3",
        "text-hex": "1.0.x"
      }
    },
    "combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "requires": {
        "delayed-stream": "~1.0.0"
      }
    },
    "comlink": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/comlink/-/comlink-4.4.1.tgz",
      "integrity": "sha512-+1dlx0aY5Jo1vHy/tSsIGpSkN4tS9rZSW8FIhG0JH/crs9wwweswIo/POr451r7bZww3hFbPAKnTpimzL/mm4Q=="
    },
    "commander": {
      "version": "2.20.3",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
      "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
    },
    "commondir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
      "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs=",
      "dev": true
    },
    "component-bind": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/component-bind/-/component-bind-1.0.0.tgz",
      "integrity": "sha512-WZveuKPeKAG9qY+FkYDeADzdHyTYdIboXS59ixDeRJL5ZhxpqUnxSOwop4FQjMsiYm3/Or8cegVbpAHNA7pHxw=="
    },
    "component-emitter": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
      "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg=="
    },
    "component-inherit": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/component-inherit/-/component-inherit-0.0.3.tgz",
      "integrity": "sha512-w+LhYREhatpVqTESyGFg3NlP6Iu0kEKUHETY9GoZP/pQyW4mHFZuFWRUCIqVPZ36ueVLtoOEZaAqbCF2RDndaA=="
    },
    "compressible": {
      "version": "2.0.18",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.18.tgz",
      "integrity": "sha512-AF3r7P5dWxL8MxyITRMlORQNaOA2IkAFaTr4k7BUumjPtRpGDTZpl0Pb1XCO6JeDCBdp126Cgs9sMxqSjgYyRg==",
      "requires": {
        "mime-db": ">= 1.43.0 < 2"
      }
    },
    "compute-scroll-into-view": {
      "version": "1.0.20",
      "resolved": "https://registry.npmjs.org/compute-scroll-into-view/-/compute-scroll-into-view-1.0.20.tgz",
      "integrity": "sha512-UCB0ioiyj8CRjtrvaceBLqqhZCVP+1B8+NWQhmdsm0VXOJtobBCf1dBQmebCCo34qZmUwZfIH2MZLqNHazrfjg=="
    },
    "concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s="
    },
    "concat-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-2.0.0.tgz",
      "integrity": "sha512-MWufYdFw53ccGjCA+Ol7XJYpAlW6/prSMzuPOTRnJGcGzuhLn4Scrz7qf6o8bROZ514ltazcIFJZevcfbo0x7A==",
      "requires": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.0.2",
        "typedarray": "^0.0.6"
      },
      "dependencies": {
        "buffer-from": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
          "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ=="
        }
      }
    },
    "configstore": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/configstore/-/configstore-4.0.0.tgz",
      "integrity": "sha512-CmquAXFBocrzaSM8mtGPMM/HiWmyIpr4CcJl/rgY2uCObZ/S7cKU0silxslqJejl+t/T9HS8E0PUNQD81JGUEQ==",
      "requires": {
        "dot-prop": "^4.1.0",
        "graceful-fs": "^4.1.2",
        "make-dir": "^1.0.0",
        "unique-string": "^1.0.0",
        "write-file-atomic": "^2.0.0",
        "xdg-basedir": "^3.0.0"
      },
      "dependencies": {
        "make-dir": {
          "version": "1.3.0",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-1.3.0.tgz",
          "integrity": "sha512-2w31R7SJtieJJnQtGc7RVL2StM2vGYVfqUOvUDxH6bC6aJTxPxTF0GnIgCyu7tjockiUWAYQRbxa7vKn34s5sQ==",
          "requires": {
            "pify": "^3.0.0"
          }
        },
        "pify": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
          "integrity": "sha512-C3FsVNH1udSEX48gGX1xfvwTWfsYWj5U+8/uK15BGzIGrKoUpghX8hWZwa/OFnakBiiVNmBvemTJR5mcy7iPcg=="
        }
      }
    },
    "console-browserify": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.2.0.tgz",
      "integrity": "sha512-ZMkYO/LkF17QvCPqM0gxw8yUzigAOZOSWSHg91FH6orS7vcEj5dVZTidN2fQ14yBSdg97RqhSNwLUXInd52OTA==",
      "dev": true
    },
    "console-control-strings": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/console-control-strings/-/console-control-strings-1.1.0.tgz",
      "integrity": "sha1-PXz0Rk22RG6mRL9LOVB/mFEAjo4="
    },
    "constants-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
      "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U=",
      "dev": true
    },
    "content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "requires": {
        "safe-buffer": "5.2.1"
      },
      "dependencies": {
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="
        }
      }
    },
    "content-type": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.4.tgz",
      "integrity": "sha512-hIP3EEPs8tB9AT1L+NUqtwOAps4mk2Zob89MWXMHjHWg9milF/j4osnnQLXBCBFBk/tvIG/tUc9mOUJiPBhPXA=="
    },
    "convert-source-map": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.8.0.tgz",
      "integrity": "sha512-+OQdjP49zViI/6i7nIJpA8rAl4sV/JdPfU9nZs3VqOwGIgizICvuN2ru6fMd+4llL0tar18UYJXfZ/TWtmhUjA==",
      "requires": {
        "safe-buffer": "~5.1.1"
      }
    },
    "convert-units": {
      "version": "2.3.4",
      "resolved": "https://registry.npmjs.org/convert-units/-/convert-units-2.3.4.tgz",
      "integrity": "sha512-ERHfdA0UhHJp1IpwE6PnFJx8LqG7B1ZjJ20UvVCmopEnVCfER68Tbe3kvN63dLbYXDA2xFWRE6zd4Wsf0w7POg==",
      "requires": {
        "lodash.foreach": "2.3.x",
        "lodash.keys": "2.3.x"
      }
    },
    "cookie": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.4.2.tgz",
      "integrity": "sha512-aSWTXFzaKWkvHO1Ny/s+ePFpvKsPnjc551iI41v3ny/ow6tBG5Vd+FuqGNhh1LxOmVzOlGUriIlOaokOvhaStA=="
    },
    "cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha1-4wOogrNCzD7oylE6eZmXNNqzriw="
    },
    "copy-concurrently": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
      "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1",
        "fs-write-stream-atomic": "^1.0.8",
        "iferr": "^0.1.5",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.0"
      },
      "dependencies": {
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
          "dev": true
        },
        "rimraf": {
          "version": "2.7.1",
          "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
          "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
          "dev": true,
          "requires": {
            "glob": "^7.1.3"
          }
        }
      }
    },
    "copy-descriptor": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
      "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40=",
      "dev": true
    },
    "core-js": {
      "version": "3.30.1",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.30.1.tgz",
      "integrity": "sha512-ZNS5nbiSwDTq4hFosEDqm65izl2CWmLz0hARJMyNQBgkUZMIF51cQiMvIQKA6hvuaeWxQDP3hEedM1JZIgTldQ=="
    },
    "core-js-compat": {
      "version": "3.21.1",
      "resolved": "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.21.1.tgz",
      "integrity": "sha512-gbgX5AUvMb8gwxC7FLVWYT7Kkgu/y7+h/h1X43yJkNqhlK2fuYyQimqvKGNZFAY6CKii/GFKJ2cp/1/42TN36g==",
      "dev": true,
      "requires": {
        "browserslist": "^4.19.1",
        "semver": "7.0.0"
      },
      "dependencies": {
        "semver": {
          "version": "7.0.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-7.0.0.tgz",
          "integrity": "sha512-+GB6zVA9LWh6zovYQLALHwv5rb2PHGlJi3lfiqIHxR0uuwCgefcOJc59v9fv1w8GbStwxuuqqAjI9NMAOOgq1A==",
          "dev": true
        }
      }
    },
    "core-util-is": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
      "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
    },
    "cosmiconfig": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-6.0.0.tgz",
      "integrity": "sha512-xb3ZL6+L8b9JLLCx3ZdoZy4+2ECphCMo2PwqgP1tlfVq6M6YReyzBJtvWWtbDSpNr9hn96pkCiZqUcFEc+54Qg==",
      "requires": {
        "@types/parse-json": "^4.0.0",
        "import-fresh": "^3.1.0",
        "parse-json": "^5.0.0",
        "path-type": "^4.0.0",
        "yaml": "^1.7.2"
      }
    },
    "create-ecdh": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.4.tgz",
      "integrity": "sha512-mf+TCx8wWc9VpuxfP2ht0iSISLZnt0JgWlrOKZiNqyUZWnjIaCIVNQArMHnCZKfEYRg6IM7A+NeJoN8gf/Ws0A==",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "elliptic": "^6.5.3"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.12.0",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
          "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA==",
          "dev": true
        }
      }
    },
    "create-hash": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
      "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.1",
        "inherits": "^2.0.1",
        "md5.js": "^1.3.4",
        "ripemd160": "^2.0.1",
        "sha.js": "^2.4.0"
      }
    },
    "create-hmac": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
      "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.3",
        "create-hash": "^1.1.0",
        "inherits": "^2.0.1",
        "ripemd160": "^2.0.0",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "cross-spawn": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-3.0.1.tgz",
      "integrity": "sha1-ElYDfsufDF9549bvE14wdwGEuYI=",
      "dev": true,
      "requires": {
        "lru-cache": "^4.0.1",
        "which": "^1.2.9"
      }
    },
    "crypto-browserify": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
      "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
      "dev": true,
      "requires": {
        "browserify-cipher": "^1.0.0",
        "browserify-sign": "^4.0.0",
        "create-ecdh": "^4.0.0",
        "create-hash": "^1.1.0",
        "create-hmac": "^1.1.0",
        "diffie-hellman": "^5.0.0",
        "inherits": "^2.0.1",
        "pbkdf2": "^3.0.3",
        "public-encrypt": "^4.0.0",
        "randombytes": "^2.0.0",
        "randomfill": "^1.0.3"
      }
    },
    "crypto-random-string": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/crypto-random-string/-/crypto-random-string-1.0.0.tgz",
      "integrity": "sha512-GsVpkFPlycH7/fRR7Dhcmnoii54gV1nz7y4CWyeFS14N+JVBBhY+r8amRHE4BwSYal7BPTDp8isvAlCxyFt3Hg=="
    },
    "css-loader": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/css-loader/-/css-loader-2.1.1.tgz",
      "integrity": "sha512-OcKJU/lt232vl1P9EEDamhoO9iKY3tIjY5GU+XDLblAykTdgs6Ux9P1hTHve8nFKy5KPpOXOsVI/hIwi3841+w==",
      "dev": true,
      "requires": {
        "camelcase": "^5.2.0",
        "icss-utils": "^4.1.0",
        "loader-utils": "^1.2.3",
        "normalize-path": "^3.0.0",
        "postcss": "^7.0.14",
        "postcss-modules-extract-imports": "^2.0.0",
        "postcss-modules-local-by-default": "^2.0.6",
        "postcss-modules-scope": "^2.1.0",
        "postcss-modules-values": "^2.0.0",
        "postcss-value-parser": "^3.3.0",
        "schema-utils": "^1.0.0"
      },
      "dependencies": {
        "schema-utils": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
          "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-errors": "^1.0.0",
            "ajv-keywords": "^3.1.0"
          }
        }
      }
    },
    "css-select": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/css-select/-/css-select-2.1.0.tgz",
      "integrity": "sha512-Dqk7LQKpwLoH3VovzZnkzegqNSuAziQyNZUcrdDM401iY+R5NkGBXGmtO05/yaXQziALuPogeG0b7UAgjnTJTQ==",
      "requires": {
        "boolbase": "^1.0.0",
        "css-what": "^3.2.1",
        "domutils": "^1.7.0",
        "nth-check": "^1.0.2"
      }
    },
    "css-select-base-adapter": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/css-select-base-adapter/-/css-select-base-adapter-0.1.1.tgz",
      "integrity": "sha512-jQVeeRG70QI08vSTwf1jHxp74JoZsr2XSgETae8/xC8ovSnL2WF87GTLO86Sbwdt2lK4Umg4HnnwMO4YF3Ce7w=="
    },
    "css-tree": {
      "version": "1.0.0-alpha.37",
      "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.0.0-alpha.37.tgz",
      "integrity": "sha512-DMxWJg0rnz7UgxKT0Q1HU/L9BeJI0M6ksor0OgqOnF+aRCDWg/N2641HmVyU9KVIu0OVVWOb2IpC9A+BJRnejg==",
      "requires": {
        "mdn-data": "2.0.4",
        "source-map": "^0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "css-vendor": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/css-vendor/-/css-vendor-2.0.8.tgz",
      "integrity": "sha512-x9Aq0XTInxrkuFeHKbYC7zWY8ai7qJ04Kxd9MnvbC1uO5DagxoHQjm4JvG+vCdXOoFtCjbL2XSZfxmoYa9uQVQ==",
      "requires": {
        "@babel/runtime": "^7.8.3",
        "is-in-browser": "^1.0.2"
      }
    },
    "css-what": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/css-what/-/css-what-3.4.2.tgz",
      "integrity": "sha512-ACUm3L0/jiZTqfzRM3Hi9Q8eZqd6IK37mMWPLz9PJxkLWllYeRf+EHUSHYEtFop2Eqytaq1FizFVh7XfBnXCDQ=="
    },
    "cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true
    },
    "cssjanus": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/cssjanus/-/cssjanus-2.1.0.tgz",
      "integrity": "sha512-kAijbny3GmdOi9k+QT6DGIXqFvL96aksNlGr4Rhk9qXDZYWUojU4bRc3IHWxdaLNOqgEZHuXoe5Wl2l7dxLW5g=="
    },
    "csso": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/csso/-/csso-4.2.0.tgz",
      "integrity": "sha512-wvlcdIbf6pwKEk7vHj8/Bkc0B4ylXZruLvOgs9doS5eOsOpuodOV2zJChSpkp+pRpYQLQMeF04nr3Z68Sta9jA==",
      "requires": {
        "css-tree": "^1.1.2"
      },
      "dependencies": {
        "css-tree": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.1.3.tgz",
          "integrity": "sha512-tRpdppF7TRazZrjJ6v3stzv93qxRcSsFmW6cX0Zm2NVKpxE1WV1HblnghVv9TreireHkqI/VDEsfolRF1p6y7Q==",
          "requires": {
            "mdn-data": "2.0.14",
            "source-map": "^0.6.1"
          }
        },
        "mdn-data": {
          "version": "2.0.14",
          "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.14.tgz",
          "integrity": "sha512-dn6wd0uw5GsdswPFfsgMp5NSB0/aDe6fK94YJV/AJDYXL6HVLWBsxeq7js7Ad+mU2K9LAlwpk6kN2D5mwCPVow=="
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "cssom": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.4.4.tgz",
      "integrity": "sha512-p3pvU7r1MyyqbTk+WbNJIgJjG2VmTIaB10rI93LzVPrmDJKkzKYMtxxyAvQXR/NS6otuzveI7+7BBq3SjBS2mw=="
    },
    "cssstyle": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-2.3.0.tgz",
      "integrity": "sha512-AZL67abkUzIuvcHqk7c09cezpGNcxUxU4Ioi/05xHk4DQeTkWmGYftIE6ctU6AEt+Gn4n1lDStOtj7FKycP71A==",
      "requires": {
        "cssom": "~0.3.6"
      },
      "dependencies": {
        "cssom": {
          "version": "0.3.8",
          "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.8.tgz",
          "integrity": "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg=="
        }
      }
    },
    "csstype": {
      "version": "3.0.10",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.0.10.tgz",
      "integrity": "sha512-2u44ZG2OcNUO9HDp/Jl8C07x6pU/eTR3ncV91SiK3dhG9TWvRVsCoJw14Ckx5DgWkzGA3waZWO3d7pgqpUI/XA=="
    },
    "currently-unhandled": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/currently-unhandled/-/currently-unhandled-0.4.1.tgz",
      "integrity": "sha1-mI3zP+qxke95mmE2nddsF635V+o=",
      "dev": true,
      "requires": {
        "array-find-index": "^1.0.1"
      }
    },
    "cyclist": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-1.0.1.tgz",
      "integrity": "sha1-WW6WmP0MgOEgOMK4LW6xs1tiJNk=",
      "dev": true
    },
    "dashdash": {
      "version": "1.14.1",
      "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
      "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "data-urls": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/data-urls/-/data-urls-1.1.0.tgz",
      "integrity": "sha512-YTWYI9se1P55u58gL5GkQHW4P6VJBJ5iBT+B5a7i2Tjadhv52paJG0qHX4A0OR6/t52odI64KP2YvFpkDOi3eQ==",
      "requires": {
        "abab": "^2.0.0",
        "whatwg-mimetype": "^2.2.0",
        "whatwg-url": "^7.0.0"
      }
    },
    "date-and-time": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/date-and-time/-/date-and-time-0.6.3.tgz",
      "integrity": "sha512-lcWy3AXDRJOD7MplwZMmNSRM//kZtJaLz4n6D1P5z9wEmZGBKhJRBIr1Xs9KNQJmdXPblvgffynYji4iylUTcA=="
    },
    "debug": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.3.tgz",
      "integrity": "sha512-/zxw5+vh1Tfv+4Qn7a5nsbcJKPaSvCDhojn6FEl9vupwK2VCSDtEiEtqr8DFtzYFOdz63LBkxec7DYuc2jon6Q==",
      "requires": {
        "ms": "2.1.2"
      }
    },
    "decamelize": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
      "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA=",
      "dev": true
    },
    "decode-uri-component": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
      "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU=",
      "dev": true
    },
    "decompress-response": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/decompress-response/-/decompress-response-4.2.1.tgz",
      "integrity": "sha512-jOSne2qbyE+/r8G1VU+G/82LBs2Fs4LAsTiLSHOCOMZQl2OKZ6i8i4IyHemTe+/yIXOtTcRQMzPcgyhoFlqPkw==",
      "requires": {
        "mimic-response": "^2.0.0"
      }
    },
    "deep-equal": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/deep-equal/-/deep-equal-1.1.1.tgz",
      "integrity": "sha512-yd9c5AdiqVcR+JjcwUQb9DkhJc8ngNr0MahEBGvDiJw8puWab2yZlh+nkasOnZP+EGTAP6rRp2JzJhJZzvNF8g==",
      "requires": {
        "is-arguments": "^1.0.4",
        "is-date-object": "^1.0.1",
        "is-regex": "^1.0.4",
        "object-is": "^1.0.1",
        "object-keys": "^1.1.1",
        "regexp.prototype.flags": "^1.2.0"
      }
    },
    "deep-extend": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.6.0.tgz",
      "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA=="
    },
    "deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ=="
    },
    "define-properties": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.3.tgz",
      "integrity": "sha512-3MqfYKj2lLzdMSf8ZIZE/V+Zuy+BgD6f164e8K2w7dgnpKArBDerGYpM46IYYcjnkdPNMjPk9A6VFB8+3SKlXQ==",
      "requires": {
        "object-keys": "^1.0.12"
      }
    },
    "define-property": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
      "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
      "dev": true,
      "requires": {
        "is-descriptor": "^1.0.2",
        "isobject": "^3.0.1"
      }
    },
    "delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
    },
    "delegates": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delegates/-/delegates-1.0.0.tgz",
      "integrity": "sha1-hMbhWbgZBP3KWaDvRM2HDTElD5o="
    },
    "denque": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/denque/-/denque-1.5.1.tgz",
      "integrity": "sha512-XwE+iZ4D6ZUB7mfYRMb5wByE8L74HCn30FBN7sWnXksWc1LO1bPDl67pBR9o/kC4z/xSNAwkMYcGgqDV3BE3Hw=="
    },
    "depd": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
      "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak="
    },
    "des.js": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.1.tgz",
      "integrity": "sha512-Q0I4pfFrv2VPd34/vfLrFOoRmlYj3OV50i7fskps1jZWK1kApMWWT9G6RRUeYedLcBDIhnSDaUvJMb3AhUlaEA==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      }
    },
    "destroy": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.0.4.tgz",
      "integrity": "sha1-l4hXRCxEdJ5CBmE+N5RiBYJqvYA="
    },
    "detect-file": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/detect-file/-/detect-file-1.0.0.tgz",
      "integrity": "sha1-8NZtA2cqglyxtzvbP+YjEMjlUrc=",
      "dev": true
    },
    "detect-indent": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/detect-indent/-/detect-indent-4.0.0.tgz",
      "integrity": "sha1-920GQ1LN9Docts5hnE7jqUdd4gg=",
      "dev": true,
      "requires": {
        "repeating": "^2.0.0"
      }
    },
    "detect-libc": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.0.1.tgz",
      "integrity": "sha512-463v3ZeIrcWtdgIg6vI6XUncguvr2TnGl4SzDXinkt9mSLpBJKXT3mW6xT3VQdDN11+WVs29pgvivTc4Lp8v+w=="
    },
    "devtools-protocol": {
      "version": "0.0.818844",
      "resolved": "https://registry.npmjs.org/devtools-protocol/-/devtools-protocol-0.0.818844.tgz",
      "integrity": "sha512-AD1hi7iVJ8OD0aMLQU5VK0XH9LDlA1+BcPIgrAxPfaibx2DbWucuyOhc4oyQCbnvDDO68nN6/LcKfqTP343Jjg==",
      "dev": true
    },
    "diacritics": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/diacritics/-/diacritics-1.3.0.tgz",
      "integrity": "sha512-wlwEkqcsaxvPJML+rDh/2iS824jbREk6DUMUKkEaSlxdYHeS43cClJtsWglvw2RfeXGm6ohKDqsXteJ5sP5enA=="
    },
    "dicer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/dicer/-/dicer-0.3.0.tgz",
      "integrity": "sha512-MdceRRWqltEG2dZqO769g27N/3PXfcKl04VhYnBlo2YhH7zPi88VebsjTKclaOyiuMaGU72hTfw3VkUitGcVCA==",
      "requires": {
        "streamsearch": "0.1.2"
      },
      "dependencies": {
        "streamsearch": {
          "version": "0.1.2",
          "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-0.1.2.tgz",
          "integrity": "sha512-jos8u++JKm0ARcSUTAZXOVC0mSox7Bhn6sBgty73P1f3JGf7yG2clTbBNHUdde/kdvP2FESam+vM6l8jBrNxHA=="
        }
      }
    },
    "diff": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/diff/-/diff-1.4.0.tgz",
      "integrity": "sha512-VzVc42hMZbYU9Sx/ltb7KYuQ6pqAw+cbFWVy4XKdkuEL2CFaRLGEnISPs7YdzaUGpi+CpIqvRmu7hPQ4T7EQ5w=="
    },
    "diffie-hellman": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
      "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "miller-rabin": "^4.0.0",
        "randombytes": "^2.0.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.12.0",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
          "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA==",
          "dev": true
        }
      }
    },
    "direction": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/direction/-/direction-1.0.4.tgz",
      "integrity": "sha512-GYqKi1aH7PJXxdhTeZBFrg8vUBeKXi+cNprXsC1kpJcbcVnV9wBsrOu1cQEdG0WeQwlfHiy3XvnKfIrJ2R0NzQ=="
    },
    "dom-helpers": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz",
      "integrity": "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==",
      "requires": {
        "@babel/runtime": "^7.8.7",
        "csstype": "^3.0.2"
      }
    },
    "dom-serializer": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-0.2.2.tgz",
      "integrity": "sha512-2/xPb3ORsQ42nHYiSunXkDjPLBaEj/xTwUO4B7XCZQTRk7EBtTOPaygh10YAAh2OI1Qrp6NWfpAhzswj0ydt9g==",
      "requires": {
        "domelementtype": "^2.0.1",
        "entities": "^2.0.0"
      },
      "dependencies": {
        "domelementtype": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-2.3.0.tgz",
          "integrity": "sha512-OLETBj6w0OsagBwdXnPdN0cnMfF9opN69co+7ZrbfPGrdpPVNBUj02spi6B1N7wChLQiPn4CSH/zJvXw56gmHw=="
        }
      }
    },
    "domain-browser": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
      "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA==",
      "dev": true
    },
    "domelementtype": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-1.3.1.tgz",
      "integrity": "sha512-BSKB+TSpMpFI/HOxCNr1O8aMOTZ8hT3pM3GQ0w/mWRmkhEDSFJkkyzz4XQsBV44BChwGkrDfMyjVD0eA2aFV3w=="
    },
    "domexception": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/domexception/-/domexception-1.0.1.tgz",
      "integrity": "sha512-raigMkn7CJNNo6Ihro1fzG7wr3fHuYVytzquZKX5n0yizGsTcYgzdIUwj1X9pK0VvjeihV+XiclP+DjwbsSKug==",
      "requires": {
        "webidl-conversions": "^4.0.2"
      }
    },
    "dompurify": {
      "version": "2.4.5",
      "resolved": "https://registry.npmjs.org/dompurify/-/dompurify-2.4.5.tgz",
      "integrity": "sha512-jggCCd+8Iqp4Tsz0nIvpcb22InKEBrGz5dw3EQJMs8HPJDsKbFIO3STYtAvCfDx26Muevn1MHVI0XxjgFfmiSA=="
    },
    "domutils": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.7.0.tgz",
      "integrity": "sha512-Lgd2XcJ/NjEw+7tFvfKxOzCYKZsdct5lczQ2ZaQY8Djz7pfAD3Gbp8ySJWtreII/vDlMVmxwa6pHmdxIYgttDg==",
      "requires": {
        "dom-serializer": "0",
        "domelementtype": "1"
      }
    },
    "dot-prop": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-4.2.1.tgz",
      "integrity": "sha512-l0p4+mIuJIua0mhxGoh4a+iNL9bmeK5DvnSVQa6T0OhrVmaEa1XScX5Etc673FePCJOArq/4Pa2cLGODUWTPOQ==",
      "requires": {
        "is-obj": "^1.0.0"
      }
    },
    "duplexer": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/duplexer/-/duplexer-0.1.2.tgz",
      "integrity": "sha512-jtD6YG370ZCIi/9GTaJKQxWTZD045+4R4hTk/x1UyoqadyJ9x9CgSi1RlVDQF8U2sxLLSnFkCaMihqljHIWgMg==",
      "dev": true
    },
    "duplexer2": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/duplexer2/-/duplexer2-0.1.4.tgz",
      "integrity": "sha1-ixLauHjA1p4+eJEFFmKjL8a93ME=",
      "requires": {
        "readable-stream": "^2.0.2"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "duplexify": {
      "version": "3.7.1",
      "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.7.1.tgz",
      "integrity": "sha512-07z8uv2wMyS51kKhD1KsdXJg5WQ6t93RneqRxUHnskXVtlYYkLqM0gqStQZ3pj073g687jPCHrqNfCzawLYh5g==",
      "requires": {
        "end-of-stream": "^1.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.0",
        "stream-shift": "^1.0.0"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "ecc-jsbn": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
      "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
      "requires": {
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.1.0"
      }
    },
    "ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "requires": {
        "safe-buffer": "^5.0.1"
      }
    },
    "ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha1-WQxhFWsK4vTwJVcyoViyZrxWsh0="
    },
    "ejs": {
      "version": "2.7.4",
      "resolved": "https://registry.npmjs.org/ejs/-/ejs-2.7.4.tgz",
      "integrity": "sha512-7vmuyh5+kuUyJKePhQfRQBhXV5Ce+RnaeeQArKu1EAMpL3WbgMt5WG6uQZpEVvYSSsxMXRKOewtDk9RaTKXRlA==",
      "dev": true
    },
    "electron-to-chromium": {
      "version": "1.4.71",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.71.tgz",
      "integrity": "sha512-Hk61vXXKRb2cd3znPE9F+2pLWdIOmP7GjiTj45y6L3W/lO+hSnUSUhq+6lEaERWBdZOHbk2s3YV5c9xVl3boVw==",
      "dev": true
    },
    "elliptic": {
      "version": "6.5.4",
      "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz",
      "integrity": "sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==",
      "dev": true,
      "requires": {
        "bn.js": "^4.11.9",
        "brorand": "^1.1.0",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.1",
        "inherits": "^2.0.4",
        "minimalistic-assert": "^1.0.1",
        "minimalistic-crypto-utils": "^1.0.1"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.12.0",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
          "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA==",
          "dev": true
        }
      }
    },
    "email-addresses": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/email-addresses/-/email-addresses-4.0.0.tgz",
      "integrity": "sha512-Nas3sSSiD5lSIoqBos0FMjB9h4clHxXuAahHKGJ5doRWavEB7pBHzOxnI7R5f1MuGNrrSnsZFJ81HCBv0DZmnw=="
    },
    "emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
    },
    "emojis-list": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-3.0.0.tgz",
      "integrity": "sha512-/kyM18EfinwXZbno9FyUGeFh87KC8HRQBQGildHZbEuRyWFOmv1U10o9BBp8XVZDVNNuQKyIGIu5ZYAAXJ0V2Q==",
      "dev": true
    },
    "enabled": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/enabled/-/enabled-2.0.0.tgz",
      "integrity": "sha512-AKrN98kuwOzMIdAizXGI86UFBoo26CL21UM763y1h/GMSJ4/OHU9k2YlsmBpyScFo/wbLzWQJBMCW4+IO3/+OQ=="
    },
    "encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha1-rT/0yG7C0CkyL1oCw6mmBslbP1k="
    },
    "end-of-stream": {
      "version": "1.4.4",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
      "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
      "requires": {
        "once": "^1.4.0"
      }
    },
    "engine.io": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/engine.io/-/engine.io-3.6.1.tgz",
      "integrity": "sha512-dfs8EVg/i7QjFsXxn7cCRQ+Wai1G1TlEvHhdYEi80fxn5R1vZ2K661O6v/rezj1FP234SZ14r9CmJke99iYDGg==",
      "requires": {
        "accepts": "~1.3.4",
        "base64id": "2.0.0",
        "cookie": "~0.4.1",
        "debug": "~4.1.0",
        "engine.io-parser": "~2.2.0",
        "ws": "~7.4.2"
      },
      "dependencies": {
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "ws": {
          "version": "7.4.6",
          "resolved": "https://registry.npmjs.org/ws/-/ws-7.4.6.tgz",
          "integrity": "sha512-YmhHDO4MzaDLB+M9ym/mDA5z0naX8j7SIlT8f8z+I0VtzsRbekxEutHSme7NPS2qE8StCYQNUnfWdXta/Yu85A=="
        }
      }
    },
    "engine.io-client": {
      "version": "3.5.3",
      "resolved": "https://registry.npmjs.org/engine.io-client/-/engine.io-client-3.5.3.tgz",
      "integrity": "sha512-qsgyc/CEhJ6cgMUwxRRtOndGVhIu5hpL5tR4umSpmX/MvkFoIxUTM7oFMDQumHNzlNLwSVy6qhstFPoWTf7dOw==",
      "requires": {
        "component-emitter": "~1.3.0",
        "component-inherit": "0.0.3",
        "debug": "~3.1.0",
        "engine.io-parser": "~2.2.0",
        "has-cors": "1.1.0",
        "indexof": "0.0.1",
        "parseqs": "0.0.6",
        "parseuri": "0.0.6",
        "ws": "~7.4.2",
        "xmlhttprequest-ssl": "~1.6.2",
        "yeast": "0.1.2"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A=="
        },
        "ws": {
          "version": "7.4.6",
          "resolved": "https://registry.npmjs.org/ws/-/ws-7.4.6.tgz",
          "integrity": "sha512-YmhHDO4MzaDLB+M9ym/mDA5z0naX8j7SIlT8f8z+I0VtzsRbekxEutHSme7NPS2qE8StCYQNUnfWdXta/Yu85A=="
        }
      }
    },
    "engine.io-parser": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/engine.io-parser/-/engine.io-parser-2.2.1.tgz",
      "integrity": "sha512-x+dN/fBH8Ro8TFwJ+rkB2AmuVw9Yu2mockR/p3W8f8YtExwFgDvBDi0GWyb4ZLkpahtDGZgtr3zLovanJghPqg==",
      "requires": {
        "after": "0.8.2",
        "arraybuffer.slice": "~0.0.7",
        "base64-arraybuffer": "0.1.4",
        "blob": "0.0.5",
        "has-binary2": "~1.0.2"
      }
    },
    "enhanced-resolve": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.5.0.tgz",
      "integrity": "sha512-Nv9m36S/vxpsI+Hc4/ZGRs0n9mXqSWGGq49zxb/cJfPAQMbUtttJAlNPS4AQzaBdw/pKskw5bMbekT/Y7W/Wlg==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "memory-fs": "^0.5.0",
        "tapable": "^1.0.0"
      },
      "dependencies": {
        "memory-fs": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.5.0.tgz",
          "integrity": "sha512-jA0rdU5KoQMC0e6ppoNRtpp6vjFq6+NY7r8hywnC7V+1Xj/MtHwGIbB1QaK/dunyjWteJzmkpd7ooeWg10T7GA==",
          "dev": true,
          "requires": {
            "errno": "^0.1.3",
            "readable-stream": "^2.0.1"
          }
        },
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "ent": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/ent/-/ent-2.2.0.tgz",
      "integrity": "sha512-GHrMyVZQWvTIdDtpiEXdHZnFQKzeO09apj8Cbl4pKWy4i0Oprcq17usfDt5aO63swf0JOeMWjWQE/LzgSRuWpA=="
    },
    "entities": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/entities/-/entities-2.2.0.tgz",
      "integrity": "sha512-p92if5Nz619I0w+akJrLZH0MX0Pb5DX39XOwQTtXSdQQOaYH03S1uIQp4mhOZtAXrxq4ViO67YTiLBo2638o9A=="
    },
    "errno": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.8.tgz",
      "integrity": "sha512-dJ6oBr5SQ1VSd9qkk7ByRgb/1SH4JZjCHSW/mr63/QcXO9zLVxvJ6Oy13nio03rxpSnVDDjFor75SjVeZWPW/A==",
      "dev": true,
      "requires": {
        "prr": "~1.0.1"
      }
    },
    "error-ex": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
      "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
      "requires": {
        "is-arrayish": "^0.2.1"
      }
    },
    "errs": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/errs/-/errs-0.3.2.tgz",
      "integrity": "sha512-r+/tydov04FSwTi+PrGd0IdY195Y1jZW2g27TJ+cErU8vvr9V4hHYxtRF8bMjv4zYEhap7wK7zBQ2i99LRo6kA=="
    },
    "es-abstract": {
      "version": "1.21.2",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.21.2.tgz",
      "integrity": "sha512-y/B5POM2iBnIxCiernH1G7rC9qQoM77lLIMQLuob0zhp8C56Po81+2Nj0WFKnd0pNReDTnkYryc+zhOzpEIROg==",
      "requires": {
        "array-buffer-byte-length": "^1.0.0",
        "available-typed-arrays": "^1.0.5",
        "call-bind": "^1.0.2",
        "es-set-tostringtag": "^2.0.1",
        "es-to-primitive": "^1.2.1",
        "function.prototype.name": "^1.1.5",
        "get-intrinsic": "^1.2.0",
        "get-symbol-description": "^1.0.0",
        "globalthis": "^1.0.3",
        "gopd": "^1.0.1",
        "has": "^1.0.3",
        "has-property-descriptors": "^1.0.0",
        "has-proto": "^1.0.1",
        "has-symbols": "^1.0.3",
        "internal-slot": "^1.0.5",
        "is-array-buffer": "^3.0.2",
        "is-callable": "^1.2.7",
        "is-negative-zero": "^2.0.2",
        "is-regex": "^1.1.4",
        "is-shared-array-buffer": "^1.0.2",
        "is-string": "^1.0.7",
        "is-typed-array": "^1.1.10",
        "is-weakref": "^1.0.2",
        "object-inspect": "^1.12.3",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.4",
        "regexp.prototype.flags": "^1.4.3",
        "safe-regex-test": "^1.0.0",
        "string.prototype.trim": "^1.2.7",
        "string.prototype.trimend": "^1.0.6",
        "string.prototype.trimstart": "^1.0.6",
        "typed-array-length": "^1.0.4",
        "unbox-primitive": "^1.0.2",
        "which-typed-array": "^1.1.9"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        },
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        },
        "object.assign": {
          "version": "4.1.4",
          "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.4.tgz",
          "integrity": "sha512-1mxKf0e58bvyjSCtKYY4sRe9itRk3PJpquJOjeIkz885CczcI4IvJJDLPS72oowuSh+pBxUFROpX+TU++hxhZQ==",
          "requires": {
            "call-bind": "^1.0.2",
            "define-properties": "^1.1.4",
            "has-symbols": "^1.0.3",
            "object-keys": "^1.1.1"
          }
        },
        "regexp.prototype.flags": {
          "version": "1.5.0",
          "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.5.0.tgz",
          "integrity": "sha512-0SutC3pNudRKgquxGoRGIz946MZVHqbNfPjBdxeOhBrdgDKlRoXmYLQN9xRbrR09ZXWeGAdPuif7egofn6v5LA==",
          "requires": {
            "call-bind": "^1.0.2",
            "define-properties": "^1.2.0",
            "functions-have-names": "^1.2.3"
          }
        }
      }
    },
    "es-array-method-boxes-properly": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/es-array-method-boxes-properly/-/es-array-method-boxes-properly-1.0.0.tgz",
      "integrity": "sha512-wd6JXUmyHmt8T5a2xreUwKcGPq6f1f+WwIJkijUqiGcJz1qqnZgP6XIK+QyIWU5lT7imeNxUll48bziG+TSYcA=="
    },
    "es-set-tostringtag": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.0.1.tgz",
      "integrity": "sha512-g3OMbtlwY3QewlqAiMLI47KywjWZoEytKr8pf6iTC8uJq5bIAH52Z9pnQ8pVL6whrCto53JZDuUIsifGeLorTg==",
      "requires": {
        "get-intrinsic": "^1.1.3",
        "has": "^1.0.3",
        "has-tostringtag": "^1.0.0"
      },
      "dependencies": {
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        }
      }
    },
    "es-to-primitive": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.1.tgz",
      "integrity": "sha512-QCOllgZJtaUo9miYBcLChTUaHNjJF3PYs1VidD7AwiEj1kYxKeQTctLAezAOH5ZKRH0g2IgPn6KwB4IT8iRpvA==",
      "requires": {
        "is-callable": "^1.1.4",
        "is-date-object": "^1.0.1",
        "is-symbol": "^1.0.2"
      }
    },
    "es6-promise": {
      "version": "4.2.8",
      "resolved": "https://registry.npmjs.org/es6-promise/-/es6-promise-4.2.8.tgz",
      "integrity": "sha512-HJDGx5daxeIvxdBxvG2cb9g4tEvwIk3i8+nhX0yGrYmZUzbkdg8QbDevheDB8gd0//uPj4c1EQua8Q+MViT0/w=="
    },
    "es6-promisify": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz",
      "integrity": "sha512-C+d6UdsYDk0lMebHNR4S2NybQMMngAOnOwYBQjTOiv0MkoJMP0Myw2mgpDLBcpfCmRLxyFqYhS/CfOENq4SJhQ==",
      "requires": {
        "es6-promise": "^4.0.3"
      }
    },
    "escalade": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.1.1.tgz",
      "integrity": "sha512-k0er2gUkLf8O0zKJiAhmkTnJlTvINGv7ygDNPbeIsX/TJjGJZHuh9B2UxbsaEkmlEo9MfhrSzmhIlhRlI2GXnw==",
      "dev": true
    },
    "escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg="
    },
    "escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA=="
    },
    "escodegen": {
      "version": "1.14.3",
      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.14.3.tgz",
      "integrity": "sha512-qFcX0XJkdg+PB3xjZZG/wKSuT1PnQWx57+TVSjIMmILd2yC/6ByYElPwJnslDsuWuSAp4AwJGumarAAmJch5Kw==",
      "requires": {
        "esprima": "^4.0.1",
        "estraverse": "^4.2.0",
        "esutils": "^2.0.2",
        "optionator": "^0.8.1",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "optional": true
        }
      }
    },
    "eslint-scope": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
      "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
      "dev": true,
      "requires": {
        "esrecurse": "^4.1.0",
        "estraverse": "^4.1.1"
      }
    },
    "esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="
    },
    "esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "requires": {
        "estraverse": "^5.2.0"
      },
      "dependencies": {
        "estraverse": {
          "version": "5.3.0",
          "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
          "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
          "dev": true
        }
      }
    },
    "estraverse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
      "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw=="
    },
    "esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g=="
    },
    "etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc="
    },
    "event-target-shim": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
      "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ=="
    },
    "eventemitter2": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eventemitter2/-/eventemitter2-5.0.1.tgz",
      "integrity": "sha512-5EM1GHXycJBS6mauYAbVKT1cVs7POKWb2NXD4Vyt8dDqeZa7LaDK1/sjtL+Zb0lzTpSNil4596Dyu97hz37QLg=="
    },
    "events": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/events/-/events-1.1.1.tgz",
      "integrity": "sha512-kEcvvCBByWXGnZy6JUlgAp2gBIUjfCAV6P6TgT1/aaQKcmuAEC4OZTV1I4EWQLz2gxZw76atuVyvHhTxvi0Flw=="
    },
    "evp_bytestokey": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
      "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
      "dev": true,
      "requires": {
        "md5.js": "^1.3.4",
        "safe-buffer": "^5.1.1"
      }
    },
    "expand-brackets": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
      "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
      "dev": true,
      "requires": {
        "debug": "^2.3.3",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "posix-character-classes": "^0.1.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^0.1.6",
            "is-data-descriptor": "^0.1.4",
            "kind-of": "^5.0.0"
          }
        },
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g=",
          "dev": true
        }
      }
    },
    "expand-template": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/expand-template/-/expand-template-2.0.3.tgz",
      "integrity": "sha512-XYfuKMvj4O35f/pOXLObndIRvyQ+/+6AhODh+OKWj9S9498pHHn/IMszH+gt0fBCRWMNfk1ZSp5x3AifmnI2vg=="
    },
    "expand-tilde": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/expand-tilde/-/expand-tilde-2.0.2.tgz",
      "integrity": "sha1-l+gBqgUt8CRU3kawK/YhZCzchQI=",
      "dev": true,
      "requires": {
        "homedir-polyfill": "^1.0.1"
      }
    },
    "express": {
      "version": "4.17.3",
      "resolved": "https://registry.npmjs.org/express/-/express-4.17.3.tgz",
      "integrity": "sha512-yuSQpz5I+Ch7gFrPCk4/c+dIBKlQUxtgwqzph132bsT6qhuzss6I8cLJQz7B3rFblzd6wtcI0ZbGltH/C4LjUg==",
      "requires": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "1.19.2",
        "content-disposition": "0.5.4",
        "content-type": "~1.0.4",
        "cookie": "0.4.2",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "~1.1.2",
        "fresh": "0.5.2",
        "merge-descriptors": "1.0.1",
        "methods": "~1.1.2",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.3",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "~2.0.7",
        "qs": "6.9.7",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "0.17.2",
        "serve-static": "1.14.2",
        "setprototypeof": "1.2.0",
        "statuses": "~1.5.0",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        },
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="
        }
      }
    },
    "express-graphql": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/express-graphql/-/express-graphql-0.9.0.tgz",
      "integrity": "sha512-wccd9Lb6oeJ8yHpUs/8LcnGjFUUQYmOG9A5BNLybRdCzGw0PeUrtBxsIR8bfiur6uSW4OvPkVDoYH06z6/N9+w==",
      "requires": {
        "accepts": "^1.3.7",
        "content-type": "^1.0.4",
        "http-errors": "^1.7.3",
        "raw-body": "^2.4.1"
      }
    },
    "extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
    },
    "extend-shallow": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
      "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
      "dev": true,
      "requires": {
        "assign-symbols": "^1.0.0",
        "is-extendable": "^1.0.1"
      }
    },
    "extglob": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
      "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
      "dev": true,
      "requires": {
        "array-unique": "^0.3.2",
        "define-property": "^1.0.0",
        "expand-brackets": "^2.1.4",
        "extend-shallow": "^2.0.1",
        "fragment-cache": "^0.2.1",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        }
      }
    },
    "extract-zip": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/extract-zip/-/extract-zip-2.0.1.tgz",
      "integrity": "sha512-GDhU9ntwuKyGXdZBUgTIe+vXnWj0fppUEtMDL0+idd5Sta8TGpHssn/eusA9mrPr9qNDym6SxAYZjNvCn/9RBg==",
      "dev": true,
      "requires": {
        "@types/yauzl": "^2.9.1",
        "debug": "^4.1.1",
        "get-stream": "^5.1.0",
        "yauzl": "^2.10.0"
      }
    },
    "extsprintf": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
      "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU="
    },
    "fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q=="
    },
    "fast-json-patch": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/fast-json-patch/-/fast-json-patch-2.2.1.tgz",
      "integrity": "sha512-4j5uBaTnsYAV5ebkidvxiLUYOwjQ+JSFljeqfTxCrH9bDmlCQaOJFS84oDJ2rAXZq2yskmk3ORfoP9DCwqFNig==",
      "requires": {
        "fast-deep-equal": "^2.0.1"
      },
      "dependencies": {
        "fast-deep-equal": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-2.0.1.tgz",
          "integrity": "sha512-bCK/2Z4zLidyB4ReuIsvALH6w31YfAQDmXMqMx6FyfHqvBxtjC0eRumeSu4Bs3XtXwpyIywtSTrVT99BxY1f9w=="
        }
      }
    },
    "fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="
    },
    "fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw=="
    },
    "fast-text-encoding": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/fast-text-encoding/-/fast-text-encoding-1.0.6.tgz",
      "integrity": "sha512-VhXlQgj9ioXCqGstD37E/HBeqEGV/qOD/kmbVG8h5xKBYvM1L3lR1Zn4555cQ8GkYbJa8aJSipLPndE1k6zK2w=="
    },
    "fd-slicer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/fd-slicer/-/fd-slicer-1.1.0.tgz",
      "integrity": "sha1-JcfInLH5B3+IkbvmHY85Dq4lbx4=",
      "dev": true,
      "requires": {
        "pend": "~1.2.0"
      }
    },
    "fecha": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/fecha/-/fecha-4.2.3.tgz",
      "integrity": "sha512-OP2IUU6HeYKJi3i0z4A19kHMQoLVs4Hc+DPqqxI2h/DPZHTm/vjsfC6P0b4jCMy14XizLBqvndQ+UilD7707Jw=="
    },
    "figgy-pudding": {
      "version": "3.5.2",
      "resolved": "https://registry.npmjs.org/figgy-pudding/-/figgy-pudding-3.5.2.tgz",
      "integrity": "sha512-0btnI/H8f2pavGMN8w40mlSKOfTK2SVJmBfBeVIj3kNw0swwgzyRq0d5TJVOwodFmtvpPeWPN/MCcfuWF0Ezbw==",
      "dev": true
    },
    "file-selector": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/file-selector/-/file-selector-0.4.0.tgz",
      "integrity": "sha512-iACCiXeMYOvZqlF1kTiYINzgepRBymz1wwjiuup9u9nayhb6g4fSwiyJ/6adli+EPwrWtpgQAh2PoS7HukEGEg==",
      "requires": {
        "tslib": "^2.0.3"
      }
    },
    "file-uri-to-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
      "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
      "dev": true,
      "optional": true
    },
    "filed-mimefix": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/filed-mimefix/-/filed-mimefix-0.1.3.tgz",
      "integrity": "sha512-YA0WJ1XrZLvsd/4VWj/R54+eaTTecjTlxBl5Kh0iPe2gh176tD/YMZG18muZ1NHCyeN6jRNcLgjoLB/ch4x3Fw==",
      "requires": {
        "mime": "^1.4.0"
      },
      "dependencies": {
        "mime": {
          "version": "1.6.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
          "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg=="
        }
      }
    },
    "filesize": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/filesize/-/filesize-3.6.1.tgz",
      "integrity": "sha512-7KjR1vv6qnicaPMi1iiTcI85CyYwRO/PSFCu6SvqL8jN2Wjt/NIYQTFtFs7fSDCYOstUkEWIQGFUg5YZQfjlcg==",
      "dev": true
    },
    "fill-range": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
      "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
      "dev": true,
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1",
        "to-regex-range": "^2.1.0"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        }
      }
    },
    "finalhandler": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.1.2.tgz",
      "integrity": "sha512-aAWcW57uxVNrQZqFXjITpW3sIUQmHGG3qSb9mUah9MgMC4NeWhNOlNjXEYq3HjRAvL6arUviZGGJsBg6z0zsWA==",
      "requires": {
        "debug": "2.6.9",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "on-finished": "~2.3.0",
        "parseurl": "~1.3.3",
        "statuses": "~1.5.0",
        "unpipe": "~1.0.0"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
        }
      }
    },
    "find-cache-dir": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-3.3.2.tgz",
      "integrity": "sha512-wXZV5emFEjrridIgED11OoUKLxiYjAcqot/NJdAkOhlJ+vGzwhOAfcG5OX1jP+S0PcjEn8bdMJv+g2jwQ3Onig==",
      "dev": true,
      "requires": {
        "commondir": "^1.0.1",
        "make-dir": "^3.0.2",
        "pkg-dir": "^4.1.0"
      }
    },
    "find-root": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/find-root/-/find-root-1.1.0.tgz",
      "integrity": "sha512-NKfW6bec6GfKc0SGx1e07QZY9PE99u0Bft/0rzSD5k3sO/vwkVUpDUKVm5Gpp5Ue3YfShPFTX2070tDs5kB9Ng=="
    },
    "find-up": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-4.1.0.tgz",
      "integrity": "sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==",
      "dev": true,
      "requires": {
        "locate-path": "^5.0.0",
        "path-exists": "^4.0.0"
      }
    },
    "findup-sync": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/findup-sync/-/findup-sync-3.0.0.tgz",
      "integrity": "sha512-YbffarhcicEhOrm4CtrwdKBdCuz576RLdhJDsIfvNtxUuhdRet1qZcsMjqbePtAseKdAnDyM/IyXbu7PRPRLYg==",
      "dev": true,
      "requires": {
        "detect-file": "^1.0.0",
        "is-glob": "^4.0.0",
        "micromatch": "^3.0.4",
        "resolve-dir": "^1.0.1"
      }
    },
    "flush-write-stream": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.1.1.tgz",
      "integrity": "sha512-3Z4XhFZ3992uIq0XOqb9AreonueSYphE6oYbpt5+3u06JWklbsPkNv3ZKkP9Bz/r+1MWCaMoSQ28P85+1Yc77w==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.3",
        "readable-stream": "^2.3.6"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "fn.name": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/fn.name/-/fn.name-1.1.0.tgz",
      "integrity": "sha512-GRnmB5gPyJpAhTQdSZTSp9uaPSvl09KoYcMQtsB9rQoOmzs9dH6ffeccH+Z+cv6P68Hu5bC6JjRh4Ah/mHSNRw=="
    },
    "for-each": {
      "version": "0.3.3",
      "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.3.tgz",
      "integrity": "sha512-jqYfLp7mo9vIyQf8ykW2v7A+2N4QjeCeI5+Dz9XraiO1ign81wjiH7Fb9vSOWvQfNtmSa4H2RoQTrrXivdUZmw==",
      "requires": {
        "is-callable": "^1.1.3"
      }
    },
    "for-in": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
      "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA=",
      "dev": true
    },
    "forever-agent": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
      "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE="
    },
    "form-data": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.0.tgz",
      "integrity": "sha512-ETEklSGi5t0QMZuiXoA/Q6vcnxcLQP5vdugSpuAyi6SVGi2clPPp+xgEhuMaHC+zGgn31Kd235W35f7Hykkaww==",
      "requires": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "mime-types": "^2.1.12"
      }
    },
    "forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow=="
    },
    "fragment-cache": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
      "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
      "dev": true,
      "requires": {
        "map-cache": "^0.2.2"
      }
    },
    "fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha1-PYyt2Q2XZWn6g1qx+OSyOhBWBac="
    },
    "from2": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
      "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "readable-stream": "^2.0.0"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "fs-capacitor": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/fs-capacitor/-/fs-capacitor-8.0.0.tgz",
      "integrity": "sha512-+Lk6iSKajdGw+7XYxUkwIzreJ2G1JFlYOdnKJv5PzwFLVsoJYBpCuS7WPIUSNT1IbQaEWT1nhYU63Ud03DyzLA=="
    },
    "fs-constants": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
      "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow=="
    },
    "fs-minipass": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-2.1.0.tgz",
      "integrity": "sha512-V/JgOLFCS+R6Vcq0slCuaeWEdNC3ouDlJMNIsacH2VtALiu9mV4LPrHc5cDl8k5aw6J8jwgWWpiTo5RYhmIzvg==",
      "requires": {
        "minipass": "^3.0.0"
      },
      "dependencies": {
        "minipass": {
          "version": "3.3.6",
          "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
          "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
          "requires": {
            "yallist": "^4.0.0"
          }
        },
        "yallist": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
          "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
        }
      }
    },
    "fs-write-stream-atomic": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
      "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "iferr": "^0.1.5",
        "imurmurhash": "^0.1.4",
        "readable-stream": "1 || 2"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="
    },
    "fsevents": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
      "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
      "dev": true,
      "optional": true
    },
    "fstream": {
      "version": "1.0.12",
      "resolved": "https://registry.npmjs.org/fstream/-/fstream-1.0.12.tgz",
      "integrity": "sha512-WvJ193OHa0GHPEL+AycEJgxvBEwyfRkN1vhjca23OaPVMCaLCXTd5qAu82AjTcgP1UJmytkOKb63Ypde7raDIg==",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "inherits": "~2.0.0",
        "mkdirp": ">=0.5 0",
        "rimraf": "2"
      },
      "dependencies": {
        "rimraf": {
          "version": "2.7.1",
          "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
          "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
          "dev": true,
          "requires": {
            "glob": "^7.1.3"
          }
        }
      }
    },
    "function-bind": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
      "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
    },
    "function.prototype.name": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/function.prototype.name/-/function.prototype.name-1.1.5.tgz",
      "integrity": "sha512-uN7m/BzVKQnCUF/iW8jYea67v++2u7m5UgENbHRtdDVclOUP+FMPlCNdmk0h/ysGyo2tavMJEDqJAkJdRa1vMA==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.3",
        "es-abstract": "^1.19.0",
        "functions-have-names": "^1.2.2"
      }
    },
    "functions-have-names": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/functions-have-names/-/functions-have-names-1.2.3.tgz",
      "integrity": "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ=="
    },
    "gauge": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/gauge/-/gauge-3.0.2.tgz",
      "integrity": "sha512-+5J6MS/5XksCuXq++uFRsnUd7Ovu1XenbeuIuNRJxYWjgQbPuFhT14lAvsWfqfAmnwluf1OwMjz39HjfLPci0Q==",
      "requires": {
        "aproba": "^1.0.3 || ^2.0.0",
        "color-support": "^1.1.2",
        "console-control-strings": "^1.0.0",
        "has-unicode": "^2.0.1",
        "object-assign": "^4.1.1",
        "signal-exit": "^3.0.0",
        "string-width": "^4.2.3",
        "strip-ansi": "^6.0.1",
        "wide-align": "^1.1.2"
      }
    },
    "gaxios": {
      "version": "1.8.4",
      "resolved": "https://registry.npmjs.org/gaxios/-/gaxios-1.8.4.tgz",
      "integrity": "sha512-BoENMnu1Gav18HcpV9IleMPZ9exM+AvUjrAOV4Mzs/vfz2Lu/ABv451iEXByKiMPn2M140uul1txXCg83sAENw==",
      "requires": {
        "abort-controller": "^3.0.0",
        "extend": "^3.0.2",
        "https-proxy-agent": "^2.2.1",
        "node-fetch": "^2.3.0"
      },
      "dependencies": {
        "agent-base": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
          "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
          "requires": {
            "es6-promisify": "^5.0.0"
          }
        },
        "debug": {
          "version": "3.2.7",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
          "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "https-proxy-agent": {
          "version": "2.2.4",
          "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.4.tgz",
          "integrity": "sha512-OmvfoQ53WLjtA9HeYP9RNrWMJzzAz1JGaSFr1nijg0PVR1JaD/xbJq1mdEIIlxGpXp9eSe/O2LgU9DJmTPd0Eg==",
          "requires": {
            "agent-base": "^4.3.0",
            "debug": "^3.1.0"
          }
        }
      }
    },
    "gaze": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/gaze/-/gaze-1.1.3.tgz",
      "integrity": "sha512-BRdNm8hbWzFzWHERTrejLqwHDfS4GibPoq5wjTPIoJHoBtKGPg3xAFfxmM+9ztbXelxcf2hwQcaz1PtmFeue8g==",
      "dev": true,
      "requires": {
        "globule": "^1.0.0"
      }
    },
    "gcp-metadata": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/gcp-metadata/-/gcp-metadata-1.0.0.tgz",
      "integrity": "sha512-Q6HrgfrCQeEircnNP3rCcEgiDv7eF9+1B+1MMgpE190+/+0mjQR8PxeOaRgxZWmdDAF9EIryHB9g1moPiw1SbQ==",
      "requires": {
        "gaxios": "^1.0.2",
        "json-bigint": "^0.3.0"
      }
    },
    "gcs-resumable-upload": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/gcs-resumable-upload/-/gcs-resumable-upload-1.1.0.tgz",
      "integrity": "sha512-uBz7uHqp44xjSDzG3kLbOYZDjxxR/UAGbB47A0cC907W6yd2LkcyFDTHg+bjivkHMwiJlKv4guVWcjPCk2zScg==",
      "requires": {
        "abort-controller": "^2.0.2",
        "configstore": "^4.0.0",
        "gaxios": "^1.5.0",
        "google-auth-library": "^3.0.0",
        "pumpify": "^1.5.1",
        "stream-events": "^1.0.4"
      },
      "dependencies": {
        "abort-controller": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-2.0.3.tgz",
          "integrity": "sha512-EPSq5wr2aFyAZ1PejJB32IX9Qd4Nwus+adnp7STYFM5/23nLPBazqZ1oor6ZqbH+4otaaGXTlC8RN5hq3C8w9Q==",
          "requires": {
            "event-target-shim": "^5.0.0"
          }
        }
      }
    },
    "gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true
    },
    "get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true
    },
    "get-intrinsic": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.1.1.tgz",
      "integrity": "sha512-kWZrnVM42QCiEA2Ig1bG8zjoIMOgxWwYCEeNdwY6Tv/cOSeGpcoX4pXHfKUxNKVoArnrEr2e9srnAxxGIraS9Q==",
      "requires": {
        "function-bind": "^1.1.1",
        "has": "^1.0.3",
        "has-symbols": "^1.0.1"
      }
    },
    "get-stdin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/get-stdin/-/get-stdin-4.0.1.tgz",
      "integrity": "sha1-uWjGsKBDhDJJAui/Gl3zJXmkUP4=",
      "dev": true
    },
    "get-stream": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-5.2.0.tgz",
      "integrity": "sha512-nBF+F1rAZVCu/p7rjzgA+Yb4lfYXrpl7a6VmJrU8wF9I1CKvP/QwPNZHnOlwbTkY6dvtFIzFMSyQXbLoTQPRpA==",
      "dev": true,
      "requires": {
        "pump": "^3.0.0"
      },
      "dependencies": {
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "dev": true,
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        }
      }
    },
    "get-symbol-description": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/get-symbol-description/-/get-symbol-description-1.0.0.tgz",
      "integrity": "sha512-2EmdH1YvIQiZpltCNgkuiUnyukzxM/R6NDJX31Ke3BG1Nq5b0S2PhX59UKi9vZpPDQVdqn+1IcaAwnzTT5vCjw==",
      "requires": {
        "call-bind": "^1.0.2",
        "get-intrinsic": "^1.1.1"
      }
    },
    "get-value": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
      "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg=",
      "dev": true
    },
    "getpass": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
      "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
      "requires": {
        "assert-plus": "^1.0.0"
      }
    },
    "github-from-package": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/github-from-package/-/github-from-package-0.0.0.tgz",
      "integrity": "sha512-SyHy3T1v2NUXn29OsWdxmK6RwHD+vkj3v8en8AOBZ1wBQ/hCAQ5bAQTD02kW4W9tUp/3Qh6J8r9EvntiyCmOOw=="
    },
    "glob": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.0.tgz",
      "integrity": "sha512-lmLf6gtyrPq8tTjSmrO94wBeQbFR3HbLHbuyD69wuyQkImp2hWqMGB47OX65FBkPffO641IP9jWa1z4ivqG26Q==",
      "requires": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.0.4",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      }
    },
    "glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "optional": true,
      "requires": {
        "is-glob": "^4.0.1"
      }
    },
    "global-modules": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/global-modules/-/global-modules-2.0.0.tgz",
      "integrity": "sha512-NGbfmJBp9x8IxyJSd1P+otYK8vonoJactOogrVfFRIAEY1ukil8RSKDz2Yo7wh1oihl51l/r6W4epkeKJHqL8A==",
      "dev": true,
      "requires": {
        "global-prefix": "^3.0.0"
      }
    },
    "global-prefix": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/global-prefix/-/global-prefix-3.0.0.tgz",
      "integrity": "sha512-awConJSVCHVGND6x3tmMaKcQvwXLhjdkmomy2W+Goaui8YPgYgXJZewhg3fWC+DlfqqQuWg8AwqjGTD2nAPVWg==",
      "dev": true,
      "requires": {
        "ini": "^1.3.5",
        "kind-of": "^6.0.2",
        "which": "^1.3.1"
      }
    },
    "globals": {
      "version": "11.12.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
      "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA==",
      "dev": true
    },
    "globalthis": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.3.tgz",
      "integrity": "sha512-sFdI5LyBiNTHjRd7cGPWapiHWMOXKyuBNX/cWJ3NfzrZQVa8GI/8cofCl74AOVqq9W5kNmguTIzJ/1s2gyI9wA==",
      "requires": {
        "define-properties": "^1.1.3"
      }
    },
    "globule": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/globule/-/globule-1.3.3.tgz",
      "integrity": "sha512-mb1aYtDbIjTu4ShMB85m3UzjX9BVKe9WCzsnfMSZk+K5GpIbBOexgg4PPCt5eHDEG5/ZQAUX2Kct02zfiPLsKg==",
      "dev": true,
      "requires": {
        "glob": "~7.1.1",
        "lodash": "~4.17.10",
        "minimatch": "~3.0.2"
      },
      "dependencies": {
        "glob": {
          "version": "7.1.7",
          "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.7.tgz",
          "integrity": "sha512-OvD9ENzPLbegENnYP5UUfJIirTg4+XwMWGaQfQTY0JenxNvvIKP3U3/tAQSPIu/lHxXYSZmpXlUHeqAIdKzBLQ==",
          "dev": true,
          "requires": {
            "fs.realpath": "^1.0.0",
            "inflight": "^1.0.4",
            "inherits": "2",
            "minimatch": "^3.0.4",
            "once": "^1.3.0",
            "path-is-absolute": "^1.0.0"
          }
        },
        "minimatch": {
          "version": "3.0.8",
          "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.8.tgz",
          "integrity": "sha512-6FsRAQsxQ61mw+qP1ZzbL9Bc78x2p5OqNgNpnoAFLTrX8n5Kxph0CsnhmKKNXTWjXqU5L0pGPR7hYk+XWZr60Q==",
          "dev": true,
          "requires": {
            "brace-expansion": "^1.1.7"
          }
        }
      }
    },
    "google-auth-library": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/google-auth-library/-/google-auth-library-3.1.2.tgz",
      "integrity": "sha512-cDQMzTotwyWMrg5jRO7q0A4TL/3GWBgO7I7q5xGKNiiFf9SmGY/OJ1YsLMgI2MVHHsEGyrqYnbnmV1AE+Z6DnQ==",
      "requires": {
        "base64-js": "^1.3.0",
        "fast-text-encoding": "^1.0.0",
        "gaxios": "^1.2.1",
        "gcp-metadata": "^1.0.0",
        "gtoken": "^2.3.2",
        "https-proxy-agent": "^2.2.1",
        "jws": "^3.1.5",
        "lru-cache": "^5.0.0",
        "semver": "^5.5.0"
      },
      "dependencies": {
        "agent-base": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
          "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
          "requires": {
            "es6-promisify": "^5.0.0"
          }
        },
        "debug": {
          "version": "3.2.7",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
          "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "https-proxy-agent": {
          "version": "2.2.4",
          "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.4.tgz",
          "integrity": "sha512-OmvfoQ53WLjtA9HeYP9RNrWMJzzAz1JGaSFr1nijg0PVR1JaD/xbJq1mdEIIlxGpXp9eSe/O2LgU9DJmTPd0Eg==",
          "requires": {
            "agent-base": "^4.3.0",
            "debug": "^3.1.0"
          }
        },
        "lru-cache": {
          "version": "5.1.1",
          "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
          "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
          "requires": {
            "yallist": "^3.0.2"
          }
        },
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
        },
        "yallist": {
          "version": "3.1.1",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
          "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="
        }
      }
    },
    "google-p12-pem": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/google-p12-pem/-/google-p12-pem-1.0.5.tgz",
      "integrity": "sha512-50rTrqYPTPPwlu9TNl/HkJbBENEpbRzTOVLFJ4YWM86njZgXHFy+FP+tLRSd9m132Li9Dqi27Z3KIWDEv5y+EA==",
      "requires": {
        "node-forge": "^0.10.0",
        "pify": "^4.0.0"
      }
    },
    "gopd": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.0.1.tgz",
      "integrity": "sha512-d65bNlIadxvpb/A2abVdlqKqV563juRnZ1Wtk6s1sIR8uNsXR70xqIzVqxVf1eTqDunwT2MkczEeaezCKTZhwA==",
      "requires": {
        "get-intrinsic": "^1.1.3"
      },
      "dependencies": {
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        }
      }
    },
    "graceful-fs": {
      "version": "4.2.9",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.9.tgz",
      "integrity": "sha512-NtNxqUcXgpW2iMrfqSfR73Glt39K+BLwWsPs94yR63v45T0Wbej7eRmL5cWfwEgqXnmjQp3zaJTshdRW/qC2ZQ=="
    },
    "graphql": {
      "version": "14.7.0",
      "resolved": "https://registry.npmjs.org/graphql/-/graphql-14.7.0.tgz",
      "integrity": "sha512-l0xWZpoPKpppFzMfvVyFmp9vLN7w/ZZJPefUicMCepfJeQ8sMcztloGYY9DfjVPo6tIUDzU5Hw3MUbIjj9AVVA==",
      "requires": {
        "iterall": "^1.2.2"
      }
    },
    "graphql-fields": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/graphql-fields/-/graphql-fields-2.0.3.tgz",
      "integrity": "sha512-x3VE5lUcR4XCOxPIqaO4CE+bTK8u6gVouOdpQX9+EKHr+scqtK5Pp/l8nIGqIpN1TUlkKE6jDCCycm/WtLRAwA=="
    },
    "graphql-upload": {
      "version": "9.0.0",
      "resolved": "https://registry.npmjs.org/graphql-upload/-/graphql-upload-9.0.0.tgz",
      "integrity": "sha512-YR2o9GoDa5On3q3lYLkLo3gHfa8crCHvMY1QbT7Zqja6BUqiihqaGjbWbvSPko/gbDSmZE+zLcX46Ef+/SmRyA==",
      "requires": {
        "busboy": "^0.3.1",
        "fs-capacitor": "^4.0.1",
        "http-errors": "^1.7.3",
        "object-path": "^0.11.4"
      },
      "dependencies": {
        "busboy": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/busboy/-/busboy-0.3.1.tgz",
          "integrity": "sha512-y7tTxhGKXcyBxRKAni+awqx8uqaJKrSFSNFSeRG5CsWNdmy2BIK+6VGWEW7TZnIO/533mtMEA4rOevQV815YJw==",
          "requires": {
            "dicer": "0.3.0"
          }
        },
        "fs-capacitor": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/fs-capacitor/-/fs-capacitor-4.0.1.tgz",
          "integrity": "sha512-e0qFoKQMFe52F54dMvZLD+I1M/Gs6xB2gnZVQB5FYT/8ioP6qTb3U/tzp55O0IuPOMvSM8j4ta0bVafIFjJzxQ==",
          "requires": {
            "@types/readable-stream": "^2.3.5",
            "readable-stream": "^3.4.0"
          }
        }
      }
    },
    "growl": {
      "version": "1.9.2",
      "resolved": "https://registry.npmjs.org/growl/-/growl-1.9.2.tgz",
      "integrity": "sha512-RTBwDHhNuOx4F0hqzItc/siXCasGfC4DeWcBamclWd+6jWtBaeB/SGbMkGf0eiQoW7ib8JpvOgnUsmgMHI3Mfw=="
    },
    "gtoken": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/gtoken/-/gtoken-2.3.3.tgz",
      "integrity": "sha512-EaB49bu/TCoNeQjhCYKI/CurooBKkGxIqFHsWABW0b25fobBYVTMe84A8EBVVZhl8emiUdNypil9huMOTmyAnw==",
      "requires": {
        "gaxios": "^1.0.4",
        "google-p12-pem": "^1.0.0",
        "jws": "^3.1.5",
        "mime": "^2.2.0",
        "pify": "^4.0.0"
      }
    },
    "gzip-size": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/gzip-size/-/gzip-size-5.1.1.tgz",
      "integrity": "sha512-FNHi6mmoHvs1mxZAds4PpdCS6QG8B4C1krxJsMutgxl5t3+GlRTzzI3NEkifXx2pVsOvJdOGSmIgDhQ55FwdPA==",
      "dev": true,
      "requires": {
        "duplexer": "^0.1.1",
        "pify": "^4.0.1"
      }
    },
    "har-schema": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
      "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI="
    },
    "har-validator": {
      "version": "5.1.5",
      "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.5.tgz",
      "integrity": "sha512-nmT2T0lljbxdQZfspsno9hgrG3Uir6Ks5afism62poxqBM6sDnMEuPmzTq8XN0OEwqKLLdh1jQI3qyE66Nzb3w==",
      "requires": {
        "ajv": "^6.12.3",
        "har-schema": "^2.0.0"
      }
    },
    "has": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
      "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
      "requires": {
        "function-bind": "^1.1.1"
      }
    },
    "has-ansi": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/has-ansi/-/has-ansi-2.0.0.tgz",
      "integrity": "sha1-NPUEnOHs3ysGSa8+8k5F7TVBbZE=",
      "dev": true,
      "requires": {
        "ansi-regex": "^2.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
          "dev": true
        }
      }
    },
    "has-bigints": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.0.2.tgz",
      "integrity": "sha512-tSvCKtBr9lkF0Ex0aQiP9N+OpV4zi2r/Nee5VkRDbaqv35RLYMzbwQfFSZZH0kR+Rd6302UJZ2p/bJCEoR3VoQ=="
    },
    "has-binary2": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/has-binary2/-/has-binary2-1.0.3.tgz",
      "integrity": "sha512-G1LWKhDSvhGeAQ8mPVQlqNcOB2sJdwATtZKl2pDKKHfpf/rYj24lkinxf69blJbnsvtqqNU+L3SL50vzZhXOnw==",
      "requires": {
        "isarray": "2.0.1"
      },
      "dependencies": {
        "isarray": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.1.tgz",
          "integrity": "sha512-c2cu3UxbI+b6kR3fy0nRnAhodsvR9dx7U5+znCOzdj6IfP3upFURTr0Xl5BlQZNKZjEtxrmVyfSdeE3O57smoQ=="
        }
      }
    },
    "has-cors": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-cors/-/has-cors-1.1.0.tgz",
      "integrity": "sha512-g5VNKdkFuUuVCP9gYfDJHjK2nqdQJ7aDLTnycnc2+RvsOQbuLdF5pm7vuE5J76SEBIQjs4kQY/BWq74JUmjbXA=="
    },
    "has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0="
    },
    "has-property-descriptors": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-property-descriptors/-/has-property-descriptors-1.0.0.tgz",
      "integrity": "sha512-62DVLZGoiEBDHQyqG4w9xCuZ7eJEwNmJRWw2VY84Oedb7WFcA27fiEVe8oUQx9hAUJ4ekurquucTGwsyO1XGdQ==",
      "requires": {
        "get-intrinsic": "^1.1.1"
      }
    },
    "has-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.0.1.tgz",
      "integrity": "sha512-7qE+iP+O+bgF9clE5+UoBFzE65mlBiVj3tKCrlNQ0Ogwm0BjpT/gK4SlLYDMybDh5I3TCTKnPPa0oMG7JDYrhg=="
    },
    "has-symbols": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.2.tgz",
      "integrity": "sha512-chXa79rL/UC2KlX17jo3vRGz0azaWEx5tGqZg5pO3NUyEJVB17dMruQlzCCOfUvElghKcm5194+BCRvi2Rv/Gw=="
    },
    "has-tostringtag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.0.tgz",
      "integrity": "sha512-kFjcSNhnlGV1kyoGk7OXKSawH5JOb/LzUc5w9B02hOTO0dfFRjbHQKvg1d6cf3HbeUmtU9VbbV3qzZ2Teh97WQ==",
      "requires": {
        "has-symbols": "^1.0.2"
      }
    },
    "has-unicode": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/has-unicode/-/has-unicode-2.0.1.tgz",
      "integrity": "sha1-4Ob+aijPUROIVeCG0Wkedx3iqLk="
    },
    "has-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
      "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
      "dev": true,
      "requires": {
        "get-value": "^2.0.6",
        "has-values": "^1.0.0",
        "isobject": "^3.0.0"
      }
    },
    "has-values": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
      "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
      "dev": true,
      "requires": {
        "is-number": "^3.0.0",
        "kind-of": "^4.0.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
          "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "hash-base": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.1.0.tgz",
      "integrity": "sha512-1nmYp/rhMDiE7AYkDw+lLwlAzz0AntGIe51F3RfFfEqyQ3feY2eI/NcwC6umIQVOASPMsWJLJScWKSSvzL9IVA==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.4",
        "readable-stream": "^3.6.0",
        "safe-buffer": "^5.2.0"
      },
      "dependencies": {
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
          "dev": true
        }
      }
    },
    "hash-stream-validation": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/hash-stream-validation/-/hash-stream-validation-0.2.4.tgz",
      "integrity": "sha512-Gjzu0Xn7IagXVkSu9cSFuK1fqzwtLwFhNhVL8IFJijRNMgUttFbBSIAzKuSIrsFMO1+g1RlsoN49zPIbwPDMGQ=="
    },
    "hash.js": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
      "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.3",
        "minimalistic-assert": "^1.0.1"
      }
    },
    "he": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
      "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw=="
    },
    "history": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/history/-/history-4.10.1.tgz",
      "integrity": "sha512-36nwAD620w12kuzPAsyINPWJqlNbij+hpK1k9XRloDtym8mxzGYl2c17LnV6IAGB2Dmg4tEa7G7DlawS0+qjew==",
      "requires": {
        "@babel/runtime": "^7.1.2",
        "loose-envify": "^1.2.0",
        "resolve-pathname": "^3.0.0",
        "tiny-invariant": "^1.0.2",
        "tiny-warning": "^1.0.0",
        "value-equal": "^1.0.1"
      }
    },
    "hmac-drbg": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
      "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
      "dev": true,
      "requires": {
        "hash.js": "^1.0.3",
        "minimalistic-assert": "^1.0.0",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    },
    "hoist-non-react-statics": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz",
      "integrity": "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==",
      "requires": {
        "react-is": "^16.7.0"
      },
      "dependencies": {
        "react-is": {
          "version": "16.13.1",
          "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
          "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="
        }
      }
    },
    "home-or-tmp": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/home-or-tmp/-/home-or-tmp-2.0.0.tgz",
      "integrity": "sha1-42w/LSyufXRqhX440Y1fMqeILbg=",
      "dev": true,
      "requires": {
        "os-homedir": "^1.0.0",
        "os-tmpdir": "^1.0.1"
      }
    },
    "homedir-polyfill": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/homedir-polyfill/-/homedir-polyfill-1.0.3.tgz",
      "integrity": "sha512-eSmmWE5bZTK2Nou4g0AI3zZ9rswp7GRKoKXS1BLUkvPviOqs4YTN1djQIqrXy9k5gEtdLPy86JjRwsNM9tnDcA==",
      "dev": true,
      "requires": {
        "parse-passwd": "^1.0.0"
      }
    },
    "hoopy": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/hoopy/-/hoopy-0.1.4.tgz",
      "integrity": "sha512-HRcs+2mr52W0K+x8RzcLzuPPmVIKMSv97RGHy0Ea9y/mpcaK+xTrjICA04KAHi4GRzxliNqNJEFYWHghy3rSfQ==",
      "dev": true
    },
    "hosted-git-info": {
      "version": "2.8.9",
      "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.8.9.tgz",
      "integrity": "sha512-mxIDAb9Lsm6DoOJ7xH+5+X4y1LU/4Hi50L9C5sIswK3JzULS4bwk1FvjdBgvYR4bzT4tuUQiC15FE2f5HbLvYw==",
      "dev": true
    },
    "hpagent": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/hpagent/-/hpagent-1.2.0.tgz",
      "integrity": "sha512-A91dYTeIB6NoXG+PxTQpCCDDnfHsW9kc06Lvpu1TEe9gnd6ZFeiBoRO9JvzEv6xK7EX97/dUE8g/vBMTqTS3CA=="
    },
    "html-encoding-sniffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-1.0.2.tgz",
      "integrity": "sha512-71lZziiDnsuabfdYiUeWdCVyKuqwWi23L8YeIgV9jSSZHCtb6wB1BKWooH7L3tn4/FuZJMVWyNaIDr4RGmaSYw==",
      "requires": {
        "whatwg-encoding": "^1.0.1"
      }
    },
    "html-minifier": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/html-minifier/-/html-minifier-4.0.0.tgz",
      "integrity": "sha512-aoGxanpFPLg7MkIl/DDFYtb0iWz7jMFGqFhvEDZga6/4QTjneiD8I/NXL1x5aaoCp7FSIT6h/OhykDdPsbtMig==",
      "requires": {
        "camel-case": "^3.0.0",
        "clean-css": "^4.2.1",
        "commander": "^2.19.0",
        "he": "^1.2.0",
        "param-case": "^2.1.1",
        "relateurl": "^0.2.7",
        "uglify-js": "^3.5.1"
      }
    },
    "html-tokenize": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/html-tokenize/-/html-tokenize-2.0.1.tgz",
      "integrity": "sha512-QY6S+hZ0f5m1WT8WffYN+Hg+xm/w5I8XeUcAq/ZYP5wVC8xbKi4Whhru3FtrAebD5EhBW8rmFzkDI6eCAuFe2w==",
      "requires": {
        "buffer-from": "~0.1.1",
        "inherits": "~2.0.1",
        "minimist": "~1.2.5",
        "readable-stream": "~1.0.27-1",
        "through2": "~0.4.1"
      },
      "dependencies": {
        "isarray": {
          "version": "0.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
          "integrity": "sha1-ihis/Kmo9Bd+Cav8YDiTmwXR7t8="
        },
        "readable-stream": {
          "version": "1.0.34",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-1.0.34.tgz",
          "integrity": "sha1-Elgg40vIQtLyqq+v5MKRbuMsFXw=",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.1",
            "isarray": "0.0.1",
            "string_decoder": "~0.10.x"
          }
        },
        "string_decoder": {
          "version": "0.10.31",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-0.10.31.tgz",
          "integrity": "sha1-YuIDvEF2bGwoyfyEMB2rHFMQ+pQ="
        }
      }
    },
    "http-errors": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.8.1.tgz",
      "integrity": "sha512-Kpk9Sm7NmI+RHhnj6OIWDI1d6fIoFAtFt9RLaTMRlg/8w49juAStsrBgp0Dp4OdxdVbRIeKhtCUvoi/RuAhO4g==",
      "requires": {
        "depd": "~1.1.2",
        "inherits": "2.0.4",
        "setprototypeof": "1.2.0",
        "statuses": ">= 1.5.0 < 2",
        "toidentifier": "1.0.1"
      }
    },
    "http-signature": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
      "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
      "requires": {
        "assert-plus": "^1.0.0",
        "jsprim": "^1.2.2",
        "sshpk": "^1.7.0"
      }
    },
    "https-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
      "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM=",
      "dev": true
    },
    "https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "requires": {
        "agent-base": "6",
        "debug": "4"
      }
    },
    "hyphenate-style-name": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/hyphenate-style-name/-/hyphenate-style-name-1.0.4.tgz",
      "integrity": "sha512-ygGZLjmXfPHj+ZWh6LwbC37l43MhfztxetbFCoYTM2VjkIUpeHgSNn7QIyVFj7YQ1Wl9Cbw5sholVJPzWvC2MQ=="
    },
    "iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "requires": {
        "safer-buffer": ">= 2.1.2 < 3"
      }
    },
    "icss-replace-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/icss-replace-symbols/-/icss-replace-symbols-1.1.0.tgz",
      "integrity": "sha1-Bupvg2ead0njhs/h/oEq5dsiPe0=",
      "dev": true
    },
    "icss-utils": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/icss-utils/-/icss-utils-4.1.1.tgz",
      "integrity": "sha512-4aFq7wvWyMHKgxsH8QQtGpvbASCf+eM3wPRLI6R+MgAnTCZ6STYsRvttLvRWK0Nfif5piF394St3HeJDaljGPA==",
      "dev": true,
      "requires": {
        "postcss": "^7.0.14"
      }
    },
    "idb": {
      "version": "6.1.5",
      "resolved": "https://registry.npmjs.org/idb/-/idb-6.1.5.tgz",
      "integrity": "sha512-IJtugpKkiVXQn5Y+LteyBCNk1N8xpGV3wWZk9EVtZWH8DYkjBn0bX1XnGP9RkyZF0sAcywa6unHqSWKe7q4LGw=="
    },
    "ieee754": {
      "version": "1.1.13",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
      "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
    },
    "iferr": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
      "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE=",
      "dev": true
    },
    "immer": {
      "version": "9.0.21",
      "resolved": "https://registry.npmjs.org/immer/-/immer-9.0.21.tgz",
      "integrity": "sha512-bc4NBHqOqSfRW7POMkHd51LvClaeMXpm8dx0e8oE2GORbq5aRK7Bxl4FyzVLdGtLmvLKL7BTDBG5ACQm4HWjTA=="
    },
    "immutable": {
      "version": "3.8.2",
      "resolved": "https://registry.npmjs.org/immutable/-/immutable-3.8.2.tgz",
      "integrity": "sha512-15gZoQ38eYjEjxkorfbcgBKBL6R7T459OuK+CpcWt7O3KF4uPCx2tD0uFETlUDIyo+1789crbMhTvQBSR5yBMg=="
    },
    "import-fresh": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.0.tgz",
      "integrity": "sha512-veYYhQa+D1QBKznvhUHxb8faxlrwUnxseDAbAp457E0wLNio2bOSKnjYDhMj+YiAq61xrMGhQk9iXVk5FzgQMw==",
      "requires": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      }
    },
    "import-local": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/import-local/-/import-local-2.0.0.tgz",
      "integrity": "sha512-b6s04m3O+s3CGSbqDIyP4R6aAwAeYlVq9+WUWep6iHa8ETRf9yei1U48C5MmfJmV9AiLYYBKPMq/W+/WRpQmCQ==",
      "dev": true,
      "requires": {
        "pkg-dir": "^3.0.0",
        "resolve-cwd": "^2.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
          "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU=",
          "dev": true
        },
        "pkg-dir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
          "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
          "dev": true,
          "requires": {
            "find-up": "^3.0.0"
          }
        }
      }
    },
    "imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o="
    },
    "in-publish": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/in-publish/-/in-publish-2.0.1.tgz",
      "integrity": "sha512-oDM0kUSNFC31ShNxHKUyfZKy8ZeXZBWMjMdZHKLOk13uvT27VTL/QzRGfRUcevJhpkZAvlhPYuXkF7eNWrtyxQ==",
      "dev": true
    },
    "indent-string": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-2.1.0.tgz",
      "integrity": "sha1-ji1INIdCEhtKghi3oTfppSBJ3IA=",
      "dev": true,
      "requires": {
        "repeating": "^2.0.0"
      }
    },
    "indexof": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/indexof/-/indexof-0.0.1.tgz",
      "integrity": "sha512-i0G7hLJ1z0DE8dsqJa2rycj9dBmNKgXBvotXtZYXakU9oivfB9Uj2ZBC27qqef2U58/ZLwalxa1X/RDCdkHtVg=="
    },
    "infer-owner": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/infer-owner/-/infer-owner-1.0.4.tgz",
      "integrity": "sha512-IClj+Xz94+d7irH5qRyfJonOdfTzuDaifE6ZPWfx0N0+/ATZCbuTPq2prFl526urkQd90WyUKIh1DfBQ2hMz9A==",
      "dev": true
    },
    "inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
      "requires": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
    },
    "ini": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.8.tgz",
      "integrity": "sha512-JV/yugV2uzW5iMRSiZAyDtQd+nxtUnjeLt0acNdw98kKLrvuRVyB80tsREOE7yvGVgalhZ6RNXCmEHkUKBKxew=="
    },
    "internal-slot": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.0.5.tgz",
      "integrity": "sha512-Y+R5hJrzs52QCG2laLn4udYVnxsfny9CpOhNhUvk/SSSVyF6T27FzRbF0sroPidSu3X8oEAkOn2K804mjpt6UQ==",
      "requires": {
        "get-intrinsic": "^1.2.0",
        "has": "^1.0.3",
        "side-channel": "^1.0.4"
      },
      "dependencies": {
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        }
      }
    },
    "interpret": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/interpret/-/interpret-1.4.0.tgz",
      "integrity": "sha512-agE4QfB2Lkp9uICn7BAqoscw4SZP9kTE2hxiFI3jBPmXJfdqiahTbUuKGsMoN2GtqL9AxhYioAcVvgsb1HvRbA==",
      "dev": true
    },
    "invariant": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
      "dev": true,
      "requires": {
        "loose-envify": "^1.0.0"
      }
    },
    "ip": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/ip/-/ip-1.1.8.tgz",
      "integrity": "sha512-PuExPYUiu6qMBQb4l06ecm6T6ujzhmh+MeJcW9wa89PoAz5pvd4zPgN5WJV104mb6S2T1AwNIAaB70JNrLQWhg=="
    },
    "ip-regex": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/ip-regex/-/ip-regex-2.1.0.tgz",
      "integrity": "sha512-58yWmlHpp7VYfcdTwMTvwMmqx/Elfxjd9RXTDyMsbL7lLWmhMylLEqiYVLKuLzOZqVgiWXD9MfR62Vv89VRxkw=="
    },
    "ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g=="
    },
    "is-accessor-descriptor": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
      "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
      "dev": true,
      "requires": {
        "kind-of": "^6.0.0"
      }
    },
    "is-arguments": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-arguments/-/is-arguments-1.1.1.tgz",
      "integrity": "sha512-8Q7EARjzEnKpt/PCD7e1cgUS0a6X8u5tdSiMqXhojOdoV9TsMsiO+9VLC5vAmO8N7/GmXn7yjR8qnA6bVAEzfA==",
      "requires": {
        "call-bind": "^1.0.2",
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-array-buffer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.2.tgz",
      "integrity": "sha512-y+FyyR/w8vfIRq4eQcM1EYgSTnmHXPqaF+IgzgraytCFq5Xh8lllDVmAZolPJiZttZLeFSINPYMaEJ7/vWUa1w==",
      "requires": {
        "call-bind": "^1.0.2",
        "get-intrinsic": "^1.2.0",
        "is-typed-array": "^1.1.10"
      },
      "dependencies": {
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        }
      }
    },
    "is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0="
    },
    "is-bigint": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.0.4.tgz",
      "integrity": "sha512-zB9CruMamjym81i2JZ3UMn54PKGsQzsJeo6xvN3HJJ4CAsQNB6iRutp2To77OfCNuoxspsIhzaPoO1zyCEhFOg==",
      "requires": {
        "has-bigints": "^1.0.1"
      }
    },
    "is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "optional": true,
      "requires": {
        "binary-extensions": "^2.0.0"
      }
    },
    "is-boolean-object": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.1.2.tgz",
      "integrity": "sha512-gDYaKHJmnj4aWxyj6YHyXVpdQawtVLHU5cb+eztPGczf6cjuTdwve5ZIEfgXqH4e57An1D1AKf8CZ3kYrQRqYA==",
      "requires": {
        "call-bind": "^1.0.2",
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-buffer": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
      "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w==",
      "dev": true
    },
    "is-callable": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
      "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA=="
    },
    "is-core-module": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.8.1.tgz",
      "integrity": "sha512-SdNCUs284hr40hFTFP6l0IfZ/RSrMXF3qgoRHd3/79unUTvrFO/JoXwkGm+5J/Oe3E/b5GsnG330uUNgRpu1PA==",
      "requires": {
        "has": "^1.0.3"
      }
    },
    "is-data-descriptor": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
      "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
      "dev": true,
      "requires": {
        "kind-of": "^6.0.0"
      }
    },
    "is-date-object": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.5.tgz",
      "integrity": "sha512-9YQaSxsAiSwcvS33MBk3wTCVnWK+HhF8VZR2jRxehM16QcVOdHqPn4VPHmRK4lSr38n9JriurInLcP90xsYNfQ==",
      "requires": {
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-descriptor": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
      "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
      "dev": true,
      "requires": {
        "is-accessor-descriptor": "^1.0.0",
        "is-data-descriptor": "^1.0.0",
        "kind-of": "^6.0.2"
      }
    },
    "is-extendable": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
      "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
      "dev": true,
      "requires": {
        "is-plain-object": "^2.0.4"
      }
    },
    "is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
      "dev": true
    },
    "is-finite": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-finite/-/is-finite-1.1.0.tgz",
      "integrity": "sha512-cdyMtqX/BOqqNBBiKlIVkytNHm49MtMlYyn1zxzvJKWmFMlGzm+ry5BBfYyeY9YmNKbRSo/o7OX9w9ale0wg3w==",
      "dev": true
    },
    "is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="
    },
    "is-generator-function": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.0.10.tgz",
      "integrity": "sha512-jsEjy9l3yiXEQ+PsXdmBwEPcOxaXWLspKdplFUVI9vq1iZgIekeC0L167qeu86czQaxed3q/Uzuw0swL0irL8A==",
      "requires": {
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "requires": {
        "is-extglob": "^2.1.1"
      }
    },
    "is-hotkey": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/is-hotkey/-/is-hotkey-0.1.8.tgz",
      "integrity": "sha512-qs3NZ1INIS+H+yeo7cD9pDfwYV/jqRh1JG9S9zYrNudkoUQg7OL7ziXqRKu+InFjUIDoP2o6HIkLYMh1pcWgyQ=="
    },
    "is-in-browser": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/is-in-browser/-/is-in-browser-1.1.3.tgz",
      "integrity": "sha1-Vv9NtoOgeMYILrldrX3GLh0E+DU="
    },
    "is-negative-zero": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.2.tgz",
      "integrity": "sha512-dqJvarLawXsFbNDeJW7zAz8ItJ9cd28YufuuFzh0G8pNHjJMnY08Dv7sYX2uF5UpQOwieAeOExEYAWWfu7ZZUA=="
    },
    "is-number": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
      "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
      "dev": true,
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "is-number-object": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/is-number-object/-/is-number-object-1.0.7.tgz",
      "integrity": "sha512-k1U0IRzLMo7ZlYIfzRu23Oh6MiIFasgpb9X76eqfFZAqwH44UI4KTBvBYIZ1dSL9ZzChTB9ShHfLkR4pdW5krQ==",
      "requires": {
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-obj": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-1.0.1.tgz",
      "integrity": "sha512-l4RyHgRqGN4Y3+9JHVrNqO+tN0rV5My76uW5/nuO4K1b6vw5G8d/cmFjP9tRfEsdhZNt0IFdZuK/c2Vr4Nb+Qg=="
    },
    "is-plain-object": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
      "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
      "dev": true,
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "is-regex": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.1.4.tgz",
      "integrity": "sha512-kvRdxDsxZjhzUX07ZnLydzS1TU/TJlTUHHY4YLL87e37oUA49DfkLqgy+VjFocowy29cKvcSiu+kIv728jTTVg==",
      "requires": {
        "call-bind": "^1.0.2",
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-shared-array-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-shared-array-buffer/-/is-shared-array-buffer-1.0.2.tgz",
      "integrity": "sha512-sqN2UDu1/0y6uvXyStCOzyhAjCSlHceFoMKJW8W9EU9cvic/QdsZ0kEU93HEy3IUEFZIiH/3w+AH/UQbPHNdhA==",
      "requires": {
        "call-bind": "^1.0.2"
      }
    },
    "is-stream": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-2.0.1.tgz",
      "integrity": "sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg=="
    },
    "is-stream-ended": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/is-stream-ended/-/is-stream-ended-0.1.4.tgz",
      "integrity": "sha512-xj0XPvmr7bQFTvirqnFr50o0hQIh6ZItDqloxt5aJrR4NQsYeSsyFQERYGCAzfindAcnKjINnwEEgLx4IqVzQw=="
    },
    "is-string": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.0.7.tgz",
      "integrity": "sha512-tE2UXzivje6ofPW7l23cjDOMa09gb7xlAqG6jG5ej6uPV32TlWP3NKPigtaGeHNu9fohccRYvIiZMfOOnOYUtg==",
      "requires": {
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-symbol": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.4.tgz",
      "integrity": "sha512-C/CPBqKWnvdcxqIARxyOh4v1UUEOCHpgDa0WYgpKDFMszcrPcffg5uhwSgPCLD2WWxmq6isisz87tzT01tuGhg==",
      "requires": {
        "has-symbols": "^1.0.2"
      }
    },
    "is-typed-array": {
      "version": "1.1.10",
      "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.10.tgz",
      "integrity": "sha512-PJqgEHiWZvMpaFZ3uTc8kHPM4+4ADTlDniuQL7cU/UDA0Ql7F70yGfHph3cLNe+c9toaigv+DFzTJKhc2CtO6A==",
      "requires": {
        "available-typed-arrays": "^1.0.5",
        "call-bind": "^1.0.2",
        "for-each": "^0.3.3",
        "gopd": "^1.0.1",
        "has-tostringtag": "^1.0.0"
      }
    },
    "is-typedarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
      "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
    },
    "is-utf8": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-utf8/-/is-utf8-0.2.1.tgz",
      "integrity": "sha1-Sw2hRCEE0bM2NA6AeX6GXPOffXI=",
      "dev": true
    },
    "is-weakref": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-weakref/-/is-weakref-1.0.2.tgz",
      "integrity": "sha512-qctsuLZmIQ0+vSSMfoVvyFe2+GSEvnmZ2ezTup1SBse9+twCCeial6EEi3Nc2KFcf6+qz2FBPnjXsk8xhKSaPQ==",
      "requires": {
        "call-bind": "^1.0.2"
      }
    },
    "is-windows": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
      "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA==",
      "dev": true
    },
    "is-wsl": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
      "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0=",
      "dev": true
    },
    "isarray": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
      "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE="
    },
    "isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA=",
      "dev": true
    },
    "isobject": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
      "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8=",
      "dev": true
    },
    "isstream": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
      "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
    },
    "iterall": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/iterall/-/iterall-1.3.0.tgz",
      "integrity": "sha512-QZ9qOMdF+QLHxy1QIpUHUU1D5pS2CG2P69LF6L6CPjPYA/XMOmKV3PZpawHoAjHNyB0swdVTRxdYT4tbBbxqwg=="
    },
    "jade": {
      "version": "0.26.3",
      "resolved": "https://registry.npmjs.org/jade/-/jade-0.26.3.tgz",
      "integrity": "sha512-mkk3vzUHFjzKjpCXeu+IjXeZD+QOTjUUdubgmHtHTDwvAO2ZTkMTTVrapts5CWz3JvJryh/4KWZpjeZrCepZ3A==",
      "requires": {
        "commander": "0.6.1",
        "mkdirp": "0.3.0"
      },
      "dependencies": {
        "commander": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/commander/-/commander-0.6.1.tgz",
          "integrity": "sha512-0fLycpl1UMTGX257hRsu/arL/cUbcvQM4zMKwvLvzXtfdezIV4yotPS2dYtknF+NmEfWSoCEF6+hj9XLm/6hEw=="
        },
        "mkdirp": {
          "version": "0.3.0",
          "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.0.tgz",
          "integrity": "sha512-OHsdUcVAQ6pOtg5JYWpCBo9W/GySVuwvP9hueRMW7UqshC0tbfzLv8wjySTPm3tfUZ/21CE9E1pJagOA91Pxew=="
        }
      }
    },
    "jmespath": {
      "version": "0.16.0",
      "resolved": "https://registry.npmjs.org/jmespath/-/jmespath-0.16.0.tgz",
      "integrity": "sha512-9FzQjJ7MATs1tSpnco1K6ayiYE3figslrXA72G2HQ/n76RzvYlofyi5QM+iX4YRs/pu3yzxlVQSST23+dMDknw=="
    },
    "js-base64": {
      "version": "2.6.4",
      "resolved": "https://registry.npmjs.org/js-base64/-/js-base64-2.6.4.tgz",
      "integrity": "sha512-pZe//GGmwJndub7ZghVHz7vjb2LgC1m8B07Au3eYqeqv9emhESByMXxaEgkUkEqJe87oBbSniGYoQNIBklc7IQ==",
      "dev": true
    },
    "js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
    },
    "js-yaml": {
      "version": "3.14.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.14.1.tgz",
      "integrity": "sha512-okMH7OXXJ7YrN9Ok3/SXrnu4iX9yOk+25nqX4imS2npuvTYDmo/QEZoqwZkYaIDk3jVvBOTOIEgEhaLOynBS9g==",
      "requires": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      }
    },
    "jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
      "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
    },
    "jsdom": {
      "version": "15.2.1",
      "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-15.2.1.tgz",
      "integrity": "sha512-fAl1W0/7T2G5vURSyxBzrJ1LSdQn6Tr5UX/xD4PXDx/PDgwygedfW6El/KIj3xJ7FU61TTYnc/l/B7P49Eqt6g==",
      "requires": {
        "abab": "^2.0.0",
        "acorn": "^7.1.0",
        "acorn-globals": "^4.3.2",
        "array-equal": "^1.0.0",
        "cssom": "^0.4.1",
        "cssstyle": "^2.0.0",
        "data-urls": "^1.1.0",
        "domexception": "^1.0.1",
        "escodegen": "^1.11.1",
        "html-encoding-sniffer": "^1.0.2",
        "nwsapi": "^2.2.0",
        "parse5": "5.1.0",
        "pn": "^1.1.0",
        "request": "^2.88.0",
        "request-promise-native": "^1.0.7",
        "saxes": "^3.1.9",
        "symbol-tree": "^3.2.2",
        "tough-cookie": "^3.0.1",
        "w3c-hr-time": "^1.0.1",
        "w3c-xmlserializer": "^1.1.2",
        "webidl-conversions": "^4.0.2",
        "whatwg-encoding": "^1.0.5",
        "whatwg-mimetype": "^2.3.0",
        "whatwg-url": "^7.0.0",
        "ws": "^7.0.0",
        "xml-name-validator": "^3.0.0"
      },
      "dependencies": {
        "parse5": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.0.tgz",
          "integrity": "sha512-fxNG2sQjHvlVAYmzBZS9YlDp6PTSSDwa98vkD4QgVDDCAo84z5X1t5XyJQ62ImdLXx5NdIIfihey6xpum9/gRQ=="
        }
      }
    },
    "jsesc": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
      "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA==",
      "dev": true
    },
    "json-bigint": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/json-bigint/-/json-bigint-0.3.1.tgz",
      "integrity": "sha512-DGWnSzmusIreWlEupsUelHrhwmPPE+FiQvg+drKfk2p+bdEYa5mp4PJ8JsCWqae0M2jQNb0HPvnwvf1qOTThzQ==",
      "requires": {
        "bignumber.js": "^9.0.0"
      }
    },
    "json-parse-better-errors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
      "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw==",
      "dev": true
    },
    "json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w=="
    },
    "json-schema": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.4.0.tgz",
      "integrity": "sha512-es94M3nTIfsEPisRafak+HDLfHXnKBhV3vU5eqPcS3flIWqcxJWgXHXiey3YrpaNsanY5ei1VoYEbOzijuq9BA=="
    },
    "json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
    },
    "json-source-map": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/json-source-map/-/json-source-map-0.4.0.tgz",
      "integrity": "sha512-fVJ2mGl6pmYNmgseQch8X1ghdDntxeYgQQueypu9ZvttZwlSQuW4QztPBxgomRiRBidj5g7PtTW+7EqsTnEDNw=="
    },
    "json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
    },
    "json5": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.0.tgz",
      "integrity": "sha512-f+8cldu7X/y7RAJurMEJmdoKXGB/X550w2Nr3tTbezL6RwEE/iMcm+tZnXeoZtKuOq6ft8+CqzEkrIgx1fPoQA==",
      "dev": true,
      "requires": {
        "minimist": "^1.2.5"
      }
    },
    "jsonwebtoken": {
      "version": "8.5.1",
      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-8.5.1.tgz",
      "integrity": "sha512-XjwVfRS6jTMsqYs0EsuJ4LGxXV14zQybNd4L2r0UvbVnSF9Af8x7p5MzbJ90Ioz/9TI41/hTCvznF/loiSzn8w==",
      "requires": {
        "jws": "^3.2.2",
        "lodash.includes": "^4.3.0",
        "lodash.isboolean": "^3.0.3",
        "lodash.isinteger": "^4.0.4",
        "lodash.isnumber": "^3.0.3",
        "lodash.isplainobject": "^4.0.6",
        "lodash.isstring": "^4.0.1",
        "lodash.once": "^4.0.0",
        "ms": "^2.1.1",
        "semver": "^5.6.0"
      },
      "dependencies": {
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
        }
      }
    },
    "jsprim": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.2.tgz",
      "integrity": "sha512-P2bSOMAc/ciLz6DzgjVlGJP9+BrJWu5UDGK70C2iweC5QBIeFf0ZXRvGjEj2uYgrY2MkAAhsSWHDWlFtEroZWw==",
      "requires": {
        "assert-plus": "1.0.0",
        "extsprintf": "1.3.0",
        "json-schema": "0.4.0",
        "verror": "1.10.0"
      }
    },
    "jss": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss/-/jss-10.9.0.tgz",
      "integrity": "sha512-YpzpreB6kUunQBbrlArlsMpXYyndt9JATbt95tajx0t4MTJJcCJdd4hdNpHmOIDiUJrF/oX5wtVFrS3uofWfGw==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "csstype": "^3.0.2",
        "is-in-browser": "^1.1.3",
        "tiny-warning": "^1.0.2"
      }
    },
    "jss-plugin-camel-case": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-camel-case/-/jss-plugin-camel-case-10.9.0.tgz",
      "integrity": "sha512-UH6uPpnDk413/r/2Olmw4+y54yEF2lRIV8XIZyuYpgPYTITLlPOsq6XB9qeqv+75SQSg3KLocq5jUBXW8qWWww==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "hyphenate-style-name": "^1.0.3",
        "jss": "10.9.0"
      }
    },
    "jss-plugin-default-unit": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-default-unit/-/jss-plugin-default-unit-10.9.0.tgz",
      "integrity": "sha512-7Ju4Q9wJ/MZPsxfu4T84mzdn7pLHWeqoGd/D8O3eDNNJ93Xc8PxnLmV8s8ZPNRYkLdxZqKtm1nPQ0BM4JRlq2w==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "jss": "10.9.0"
      }
    },
    "jss-plugin-global": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-global/-/jss-plugin-global-10.9.0.tgz",
      "integrity": "sha512-4G8PHNJ0x6nwAFsEzcuVDiBlyMsj2y3VjmFAx/uHk/R/gzJV+yRHICjT4MKGGu1cJq2hfowFWCyrr/Gg37FbgQ==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "jss": "10.9.0"
      }
    },
    "jss-plugin-nested": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-nested/-/jss-plugin-nested-10.9.0.tgz",
      "integrity": "sha512-2UJnDrfCZpMYcpPYR16oZB7VAC6b/1QLsRiAutOt7wJaaqwCBvNsosLEu/fUyKNQNGdvg2PPJFDO5AX7dwxtoA==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "jss": "10.9.0",
        "tiny-warning": "^1.0.2"
      }
    },
    "jss-plugin-props-sort": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-props-sort/-/jss-plugin-props-sort-10.9.0.tgz",
      "integrity": "sha512-7A76HI8bzwqrsMOJTWKx/uD5v+U8piLnp5bvru7g/3ZEQOu1+PjHvv7bFdNO3DwNPC9oM0a//KwIJsIcDCjDzw==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "jss": "10.9.0"
      }
    },
    "jss-plugin-rule-value-function": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-rule-value-function/-/jss-plugin-rule-value-function-10.9.0.tgz",
      "integrity": "sha512-IHJv6YrEf8pRzkY207cPmdbBstBaE+z8pazhPShfz0tZSDtRdQua5jjg6NMz3IbTasVx9FdnmptxPqSWL5tyJg==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "jss": "10.9.0",
        "tiny-warning": "^1.0.2"
      }
    },
    "jss-plugin-vendor-prefixer": {
      "version": "10.9.0",
      "resolved": "https://registry.npmjs.org/jss-plugin-vendor-prefixer/-/jss-plugin-vendor-prefixer-10.9.0.tgz",
      "integrity": "sha512-MbvsaXP7iiVdYVSEoi+blrW+AYnTDvHTW6I6zqi7JcwXdc6I9Kbm234nEblayhF38EftoenbM+5218pidmC5gA==",
      "requires": {
        "@babel/runtime": "^7.3.1",
        "css-vendor": "^2.0.8",
        "jss": "10.9.0"
      }
    },
    "jwa": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz",
      "integrity": "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==",
      "requires": {
        "buffer-equal-constant-time": "1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "jws": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/jws/-/jws-3.2.2.tgz",
      "integrity": "sha512-YHlZCB6lMTllWDtSPHz/ZXTsi8S00usEV6v1tjq8tOUZzw7DpSDWVXjXDre6ed1w/pd495ODpHZYSdkRTsa0HA==",
      "requires": {
        "jwa": "^1.4.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "kind-of": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz",
      "integrity": "sha512-dcS1ul+9tmeD95T+x28/ehLgd9mENa3LsvDTtzm3vyBEO7RPptvAD+t44WVXaUjTBRcrpFeFlC8WCruUR456hw==",
      "dev": true
    },
    "kuler": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/kuler/-/kuler-2.0.0.tgz",
      "integrity": "sha512-Xq9nH7KlWZmXAtodXDDRE7vs6DU1gTU8zYDHDiWLSip45Egwq3plLHzPn27NgvzL2r1LMPC1vdqh98sQxtqj4A=="
    },
    "leaflet": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/leaflet/-/leaflet-1.9.3.tgz",
      "integrity": "sha512-iB2cR9vAkDOu5l3HAay2obcUHZ7xwUBBjph8+PGtmW/2lYhbLizWtG7nTeYht36WfOslixQF9D/uSIzhZgGMfQ=="
    },
    "levn": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
      "integrity": "sha512-0OO4y2iOHix2W6ujICbKIaEQXvFQHue65vUG3pb5EUomzPI90z9hsA1VsO/dbIIpC53J8gxM9Q4Oho0jrCM/yA==",
      "requires": {
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2"
      }
    },
    "liboneandone": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/liboneandone/-/liboneandone-1.2.0.tgz",
      "integrity": "sha512-EB6Ak9qw+U4HAOnKqPtatxQ9pLclvtsBsggrvOuD4zclJ5xOeEASojsLKEC3O8KJ1Q4obE2JHhOeDuqWXvkoUQ==",
      "requires": {
        "mocha": "^2.5.3",
        "request": "^2.74.0"
      }
    },
    "lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg=="
    },
    "load-json-file": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-1.1.0.tgz",
      "integrity": "sha1-lWkFcI1YtLq0wiYbBPWfMcmTdMA=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.2",
        "parse-json": "^2.2.0",
        "pify": "^2.0.0",
        "pinkie-promise": "^2.0.0",
        "strip-bom": "^2.0.0"
      },
      "dependencies": {
        "parse-json": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
          "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
          "dev": true,
          "requires": {
            "error-ex": "^1.2.0"
          }
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "loader-runner": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.4.0.tgz",
      "integrity": "sha512-Jsmr89RcXGIwivFY21FcRrisYZfvLMTWx5kOLc+JTxtpBOG6xML0vzbc6SEQG2FO9/4Fc3wW4LVcB5DmGflaRw==",
      "dev": true
    },
    "loader-utils": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.4.0.tgz",
      "integrity": "sha512-qH0WSMBtn/oHuwjy/NucEgbx5dbxxnxup9s4PVXJUDHZBQY+s0NWA9rJf53RBnQZxfch7euUui7hpoAPvALZdA==",
      "dev": true,
      "requires": {
        "big.js": "^5.2.2",
        "emojis-list": "^3.0.0",
        "json5": "^1.0.1"
      },
      "dependencies": {
        "json5": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
          "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
          "dev": true,
          "requires": {
            "minimist": "^1.2.0"
          }
        }
      }
    },
    "locate-path": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-5.0.0.tgz",
      "integrity": "sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==",
      "dev": true,
      "requires": {
        "p-locate": "^4.1.0"
      }
    },
    "lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
    },
    "lodash._basebind": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._basebind/-/lodash._basebind-2.3.0.tgz",
      "integrity": "sha512-SHqM7YCuJ+BeGTs7lqpWnmdHEeF4MWxS3dksJctHFNxR81FXPOzA4bS5Vs5CpcGTkBpM8FCl+YEbQEblRw8ABg==",
      "requires": {
        "lodash._basecreate": "~2.3.0",
        "lodash._setbinddata": "~2.3.0",
        "lodash.isobject": "~2.3.0"
      }
    },
    "lodash._basecreate": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._basecreate/-/lodash._basecreate-2.3.0.tgz",
      "integrity": "sha512-vwZaWldZwS2y9b99D8i9+WtgiZXbHKsBsMrpxJEqTsNW20NhJo5W8PBQkeQO9CmxuqEYn8UkMnfEM2MMT4cVrw==",
      "requires": {
        "lodash._renative": "~2.3.0",
        "lodash.isobject": "~2.3.0",
        "lodash.noop": "~2.3.0"
      }
    },
    "lodash._basecreatecallback": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._basecreatecallback/-/lodash._basecreatecallback-2.3.0.tgz",
      "integrity": "sha512-Ev+pDzzfVfgbiucpXijconLGRBar7/+KNCf05kSnk4CmdDVhAy1RdbU9efCJ/o9GXI08JdUGwZ+5QJ3QX3kj0g==",
      "requires": {
        "lodash._setbinddata": "~2.3.0",
        "lodash.bind": "~2.3.0",
        "lodash.identity": "~2.3.0",
        "lodash.support": "~2.3.0"
      }
    },
    "lodash._basecreatewrapper": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._basecreatewrapper/-/lodash._basecreatewrapper-2.3.0.tgz",
      "integrity": "sha512-YLycQ7k8AB9Wc1EOvLNxuRWcqipDkMXq2GCgnLWQR6qtgTb3gY3LELzEpnFshrEO4LOLs+R2EpcY+uCOZaLQ8Q==",
      "requires": {
        "lodash._basecreate": "~2.3.0",
        "lodash._setbinddata": "~2.3.0",
        "lodash._slice": "~2.3.0",
        "lodash.isobject": "~2.3.0"
      }
    },
    "lodash._createwrapper": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._createwrapper/-/lodash._createwrapper-2.3.0.tgz",
      "integrity": "sha512-XjaI/rzg9W+WO4WJDQ+PRlHD5sAMJ1RhJLuT65cBxLCb1kIYs4U20jqvTDGAWyVT3c34GYiLd9AreHYuB/8yJA==",
      "requires": {
        "lodash._basebind": "~2.3.0",
        "lodash._basecreatewrapper": "~2.3.0",
        "lodash.isfunction": "~2.3.0"
      }
    },
    "lodash._objecttypes": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._objecttypes/-/lodash._objecttypes-2.3.0.tgz",
      "integrity": "sha512-jbA6QyHt9cw3BzvbWzIcnU3Z12jSneT6xBgz3Y782CJsN1tV5aTBKrFo2B4AkeHBNaxSrbPYZZpi1Lwj3xjdtg=="
    },
    "lodash._renative": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._renative/-/lodash._renative-2.3.0.tgz",
      "integrity": "sha512-v44MRirqYqZGK/h5UKoVqXWF2L+LUiLTU+Ogu5rHRVWJUA1uWIlHaMpG8f/OA8j++BzPMQij9+erXHtgFcbuwg=="
    },
    "lodash._setbinddata": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._setbinddata/-/lodash._setbinddata-2.3.0.tgz",
      "integrity": "sha512-xMFfbF7dL+sFtrdE49uHFmfpBAEwlFtfgMp86nQRlAF6aizYL+3MTbnYMKJSkP1W501PhsgiBED5kBbZd8kR2g==",
      "requires": {
        "lodash._renative": "~2.3.0",
        "lodash.noop": "~2.3.0"
      }
    },
    "lodash._shimkeys": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._shimkeys/-/lodash._shimkeys-2.3.0.tgz",
      "integrity": "sha512-9Iuyi7TiWMGa/9+2rqEE+Zwye4b/U2w7Saw6UX1h6Xs88mEER+uz9FZcEBPKMVKsad9Pw5GNAcIBRnW2jNpneQ==",
      "requires": {
        "lodash._objecttypes": "~2.3.0"
      }
    },
    "lodash._slice": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash._slice/-/lodash._slice-2.3.0.tgz",
      "integrity": "sha512-7C61GhzRUv36gTafr+RIb+AomCAYsSATEoK4OP0VkNBcwvsM022Z22AVgqjjzikeNO1U29LzsJZDvLbiNPUYvA=="
    },
    "lodash.bind": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.bind/-/lodash.bind-2.3.0.tgz",
      "integrity": "sha512-goakyOo+FMN8lttMPnZ0UNlr5RlzX4IrUXyTJPT2A0tGCMXySupond9wzvDqTvVmYTcQjIKGrj8naJDS2xWAlQ==",
      "requires": {
        "lodash._createwrapper": "~2.3.0",
        "lodash._renative": "~2.3.0",
        "lodash._slice": "~2.3.0"
      }
    },
    "lodash.debounce": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
      "integrity": "sha1-gteb/zCmfEAF/9XiUVMArZyk168=",
      "dev": true
    },
    "lodash.foreach": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.foreach/-/lodash.foreach-2.3.0.tgz",
      "integrity": "sha512-yLnyptVRJd0//AbGp480grgQG9iaDIV5uOgSbpurRy1dYybPbjNTLQ3FyLEQ84buVLPG7jyaiyvpzgfOutRB3Q==",
      "requires": {
        "lodash._basecreatecallback": "~2.3.0",
        "lodash.forown": "~2.3.0"
      }
    },
    "lodash.forown": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.forown/-/lodash.forown-2.3.0.tgz",
      "integrity": "sha512-dUnCsuQTtq3Y7bxPNoEEqjJjPL2ftLtcz2PTeRKvhbpdM514AvnqCjewHGsm/W+dwspIwa14KoWEZeizJ7smxA==",
      "requires": {
        "lodash._basecreatecallback": "~2.3.0",
        "lodash._objecttypes": "~2.3.0",
        "lodash.keys": "~2.3.0"
      }
    },
    "lodash.identity": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.identity/-/lodash.identity-2.3.0.tgz",
      "integrity": "sha512-NYJ2r2cwy3tkx/saqbIZEX6oQUzjWTnGRu7d/zmBjMCZos3eHBxCpbvWFWSetv8jFVrptsp6EbWjzNgBKhUoOA=="
    },
    "lodash.includes": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.includes/-/lodash.includes-4.3.0.tgz",
      "integrity": "sha512-W3Bx6mdkRTGtlJISOvVD/lbqjTlPPUDTMnlXZFnVwi9NKJ6tiAk6LVdlhZMm17VZisqhKcgzpO5Wz91PCt5b0w=="
    },
    "lodash.isboolean": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",
      "integrity": "sha512-Bz5mupy2SVbPHURB98VAcw+aHh4vRV5IPNhILUCsOzRmsTmSQ17jIuqopAentWoehktxGd9e/hbIXq980/1QJg=="
    },
    "lodash.isfunction": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.isfunction/-/lodash.isfunction-2.3.0.tgz",
      "integrity": "sha512-X5lteBYlCrVO7Qc00fxP8W90fzRp6Ax9XcHANmU3OsZHdSyIVZ9ZlX5QTTpRq8aGY+9I5Rmd0UTzTIIyWPugEQ=="
    },
    "lodash.isinteger": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/lodash.isinteger/-/lodash.isinteger-4.0.4.tgz",
      "integrity": "sha512-DBwtEWN2caHQ9/imiNeEA5ys1JoRtRfY3d7V9wkqtbycnAmTvRRmbHKDV4a0EYc678/dia0jrte4tjYwVBaZUA=="
    },
    "lodash.isnumber": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isnumber/-/lodash.isnumber-3.0.3.tgz",
      "integrity": "sha512-QYqzpfwO3/CWf3XP+Z+tkQsfaLL/EnUlXWVkIk5FUPc4sBdTehEqZONuyRt2P67PXAk+NXmTBcc97zw9t1FQrw=="
    },
    "lodash.isobject": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.isobject/-/lodash.isobject-2.3.0.tgz",
      "integrity": "sha512-jo1pfV61C4TE8BfEzqaHj6EIKiSkFANJrB6yscwuCJMSRw5tbqjk4Gv7nJzk4Z6nFKobZjGZ8Qd41vmnwgeQqQ==",
      "requires": {
        "lodash._objecttypes": "~2.3.0"
      }
    },
    "lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA=="
    },
    "lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha512-0wJxfxH1wgO3GrbuP+dTTk7op+6L41QCXbGINEmD+ny/G/eCqGzxyCsh7159S+mgDDcoarnBw6PC1PS5+wUGgw=="
    },
    "lodash.keys": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.keys/-/lodash.keys-2.3.0.tgz",
      "integrity": "sha512-c0UW0ffqMxSCtoVbmVt2lERJLkEqgoOn2ejPsWXzr0ZrqRbl3uruGgwHzhtqXxi6K/ei3Ey7zimOqSwXgzazPg==",
      "requires": {
        "lodash._renative": "~2.3.0",
        "lodash._shimkeys": "~2.3.0",
        "lodash.isobject": "~2.3.0"
      }
    },
    "lodash.noop": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.noop/-/lodash.noop-2.3.0.tgz",
      "integrity": "sha512-NpSm8HRm1WkBBWHUveDukLF4Kfb5P5E3fjHc9Qre9A11nNubozLWD2wH3UBTZbu+KSuX8aSUvy9b+PUyEceJ8g=="
    },
    "lodash.once": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.once/-/lodash.once-4.1.1.tgz",
      "integrity": "sha512-Sb487aTOCr9drQVL8pIxOzVhafOjZN9UU54hiN8PU3uAiSV7lx1yYNpbNmex2PK6dSJoNTSJUUswT651yww3Mg=="
    },
    "lodash.sortby": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/lodash.sortby/-/lodash.sortby-4.7.0.tgz",
      "integrity": "sha512-HDWXG8isMntAyRF5vZ7xKuEvOhT4AhlRt/3czTSjvGUxjYCBVRQY48ViDHyfYz9VIoBkW4TMGQNapx+l3RUwdA=="
    },
    "lodash.support": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lodash.support/-/lodash.support-2.3.0.tgz",
      "integrity": "sha512-etc7VWbB0U3Iya8ixj2xy4sDBN3jvPX7ODi8iXtn4KkkjNpdngrdc7Vlt5jub/Vgqx6/dWtp7Ml9awhCQPYKGQ==",
      "requires": {
        "lodash._renative": "~2.3.0"
      }
    },
    "logform": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/logform/-/logform-2.5.1.tgz",
      "integrity": "sha512-9FyqAm9o9NKKfiAKfZoYo9bGXXuwMkxQiQttkT4YjjVtQVIQtK6LmVtlxmCaFswo6N4AfEkHqZTV0taDtPotNg==",
      "requires": {
        "@colors/colors": "1.5.0",
        "@types/triple-beam": "^1.3.2",
        "fecha": "^4.2.0",
        "ms": "^2.1.1",
        "safe-stable-stringify": "^2.3.1",
        "triple-beam": "^1.3.0"
      }
    },
    "loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "requires": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      }
    },
    "loud-rejection": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/loud-rejection/-/loud-rejection-1.6.0.tgz",
      "integrity": "sha1-W0b4AUft7leIcPCG0Eghz5mOVR8=",
      "dev": true,
      "requires": {
        "currently-unhandled": "^0.4.1",
        "signal-exit": "^3.0.0"
      }
    },
    "lower-case": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/lower-case/-/lower-case-1.1.4.tgz",
      "integrity": "sha512-2Fgx1Ycm599x+WGpIYwJOvsjmXFzTSc34IwDWALRA/8AopUKAVPwfJ+h5+f85BCp0PWmmJcWzEpxOpoXycMpdA=="
    },
    "lru-cache": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-4.1.5.tgz",
      "integrity": "sha512-sWZlbEP2OsHNkXrMl5GYk/jKk70MBng6UU4YI/qGDYbgf6YbP4EvmqISbXCoJiRKs+1bSpFHVgQxvJ17F2li5g==",
      "dev": true,
      "requires": {
        "pseudomap": "^1.0.2",
        "yallist": "^2.1.2"
      }
    },
    "make-dir": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-3.1.0.tgz",
      "integrity": "sha512-g3FeP20LNwhALb/6Cz6Dd4F2ngze0jz7tbzrD2wAV+o9FeNHe4rL+yK2md0J/fiSf1sa1ADhXqi5+oVwOM/eGw==",
      "requires": {
        "semver": "^6.0.0"
      }
    },
    "map-cache": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
      "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8=",
      "dev": true
    },
    "map-obj": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/map-obj/-/map-obj-1.0.1.tgz",
      "integrity": "sha1-2TPOuSBdgr3PSIb2dCvcK03qFG0=",
      "dev": true
    },
    "map-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
      "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
      "dev": true,
      "requires": {
        "object-visit": "^1.0.0"
      }
    },
    "md5.js": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
      "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
      "dev": true,
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "mdn-data": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.4.tgz",
      "integrity": "sha512-iV3XNKw06j5Q7mi6h+9vbx23Tv7JkjEVgKHW4pimwyDGWm0OIQntJJ+u1C6mg6mK1EaTv42XQ7w76yuzH7M2cA=="
    },
    "media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha1-hxDXrwqmJvj/+hzgAWhUUmMlV0g="
    },
    "memory-fs": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
      "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
      "dev": true,
      "requires": {
        "errno": "^0.1.3",
        "readable-stream": "^2.0.1"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "meow": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/meow/-/meow-3.7.0.tgz",
      "integrity": "sha1-cstmi0JSKCkKu/qFaJJYcwioAfs=",
      "dev": true,
      "requires": {
        "camelcase-keys": "^2.0.0",
        "decamelize": "^1.1.2",
        "loud-rejection": "^1.0.0",
        "map-obj": "^1.0.1",
        "minimist": "^1.1.3",
        "normalize-package-data": "^2.3.4",
        "object-assign": "^4.0.1",
        "read-pkg-up": "^1.0.1",
        "redent": "^1.0.0",
        "trim-newlines": "^1.0.0"
      }
    },
    "merge-descriptors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",
      "integrity": "sha1-sAqqVW3YtEVoFQ7J0blT8/kMu2E="
    },
    "methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha1-VSmk1nZUE07cxSZmVoNbD4Ua/O4="
    },
    "micromatch": {
      "version": "3.1.10",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
      "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
      "dev": true,
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "braces": "^2.3.1",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "extglob": "^2.0.4",
        "fragment-cache": "^0.2.1",
        "kind-of": "^6.0.2",
        "nanomatch": "^1.2.9",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.2"
      }
    },
    "miller-rabin": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
      "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
      "dev": true,
      "requires": {
        "bn.js": "^4.0.0",
        "brorand": "^1.0.1"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.12.0",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
          "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA==",
          "dev": true
        }
      }
    },
    "mime": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-2.6.0.tgz",
      "integrity": "sha512-USPkMeET31rOMiarsBNIHZKLGgvKc/LrjofAnBlOttf5ajRvqiRA8QsenbcooctK6d6Ts6aqZXBA+XbkKthiQg=="
    },
    "mime-db": {
      "version": "1.51.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.51.0.tgz",
      "integrity": "sha512-5y8A56jg7XVQx2mbv1lu49NR4dokRnhZYTtL+KGfaa27uq4pSTXkwQkFJl4pkRMyNFz/EtYDSkiiEHx3F7UN6g=="
    },
    "mime-types": {
      "version": "2.1.34",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.34.tgz",
      "integrity": "sha512-6cP692WwGIs9XXdOO4++N+7qjqv0rqxxVvJ3VHPh/Sc9mVZcQP+ZGhkKiTvWMQRr2tbHkJP/Yn7Y0npb3ZBs4A==",
      "requires": {
        "mime-db": "1.51.0"
      }
    },
    "mimic-fn": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
      "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg=="
    },
    "mimic-response": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-2.1.0.tgz",
      "integrity": "sha512-wXqjST+SLt7R009ySCglWBCFpjUygmCIfD790/kVbiGmUgfYGuB14PiTd5DwVxSV4NcYHjzMkoj5LjQZwTQLEA=="
    },
    "mini-css-extract-plugin": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/mini-css-extract-plugin/-/mini-css-extract-plugin-0.5.0.tgz",
      "integrity": "sha512-IuaLjruM0vMKhUUT51fQdQzBYTX49dLj8w68ALEAe2A4iYNpIC4eMac67mt3NzycvjOlf07/kYxJDc0RTl1Wqw==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.1.0",
        "schema-utils": "^1.0.0",
        "webpack-sources": "^1.1.0"
      },
      "dependencies": {
        "schema-utils": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
          "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-errors": "^1.0.0",
            "ajv-keywords": "^3.1.0"
          }
        }
      }
    },
    "minimalistic-assert": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
      "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A==",
      "dev": true
    },
    "minimalistic-crypto-utils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
      "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo=",
      "dev": true
    },
    "minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "requires": {
        "brace-expansion": "^1.1.7"
      }
    },
    "minimist": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.5.tgz",
      "integrity": "sha512-FM9nNUYrRBAELZQT3xeZQ7fmMOBg6nWNmJKTcgsJeaLstP/UODVpGsr5OhXhhXg6f+qtJ8uiZ+PUxkDWcgIXLw=="
    },
    "minipass": {
      "version": "4.2.8",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-4.2.8.tgz",
      "integrity": "sha512-fNzuVyifolSLFL4NzpF+wEF4qrgqaaKX0haXPQEdQ7NKAN+WecoKMHV09YcuL/DHxrUsYQOK3MiuDf7Ip2OXfQ=="
    },
    "minizlib": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-2.1.2.tgz",
      "integrity": "sha512-bAxsR8BVfj60DWXHE3u30oHzfl4G7khkSuPW+qvpd7jFRHm7dLxOjUk1EHACJ/hxLY8phGJ0YhYHZo7jil7Qdg==",
      "requires": {
        "minipass": "^3.0.0",
        "yallist": "^4.0.0"
      },
      "dependencies": {
        "minipass": {
          "version": "3.3.6",
          "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
          "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
          "requires": {
            "yallist": "^4.0.0"
          }
        },
        "yallist": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
          "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
        }
      }
    },
    "mississippi": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
      "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
      "dev": true,
      "requires": {
        "concat-stream": "^1.5.0",
        "duplexify": "^3.4.2",
        "end-of-stream": "^1.1.0",
        "flush-write-stream": "^1.0.0",
        "from2": "^2.1.0",
        "parallel-transform": "^1.1.0",
        "pump": "^3.0.0",
        "pumpify": "^1.3.3",
        "stream-each": "^1.1.0",
        "through2": "^2.0.0"
      },
      "dependencies": {
        "buffer-from": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
          "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
          "dev": true
        },
        "concat-stream": {
          "version": "1.6.2",
          "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
          "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
          "dev": true,
          "requires": {
            "buffer-from": "^1.0.0",
            "inherits": "^2.0.3",
            "readable-stream": "^2.2.2",
            "typedarray": "^0.0.6"
          }
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "dev": true,
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        },
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "through2": {
          "version": "2.0.5",
          "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.5.tgz",
          "integrity": "sha512-/mrRod8xqpA+IHSLyGCQ2s8SPHiCDEeQJSep1jqLYeEUClOFG2Qsh+4FU6G9VeqpZnGW/Su8LQGc4YKni5rYSQ==",
          "dev": true,
          "requires": {
            "readable-stream": "~2.3.6",
            "xtend": "~4.0.1"
          }
        }
      }
    },
    "mixin-deep": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.2.tgz",
      "integrity": "sha512-WRoDn//mXBiJ1H40rqa3vH0toePwSsGb45iInWlTySa+Uu4k3tYUSxa2v1KqAiLtvlrSzaExqS1gtk96A9zvEA==",
      "dev": true,
      "requires": {
        "for-in": "^1.0.2",
        "is-extendable": "^1.0.1"
      }
    },
    "mkdirp": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.5.tgz",
      "integrity": "sha512-NKmAlESf6jMGym1++R0Ra7wvhV+wFW63FaSOFPwRahvea0gMUcGUhVeAg/0BC0wiv9ih5NYPB1Wn1UEI1/L+xQ==",
      "requires": {
        "minimist": "^1.2.5"
      }
    },
    "mkdirp-classic": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/mkdirp-classic/-/mkdirp-classic-0.5.3.tgz",
      "integrity": "sha512-gKLcREMhtuZRwRAfqP3RFW+TK4JqApVBtOIftVgjuABpAtpxhPGaDcfvbhNvD0B8iD1oUr/txX35NjcaY6Ns/A=="
    },
    "mocha": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/mocha/-/mocha-2.5.3.tgz",
      "integrity": "sha512-jNt2iEk9FPmZLzL+sm4FNyOIDYXf2wUU6L4Cc8OIKK/kzgMHKPi4YhTZqG4bW4kQVdIv6wutDybRhXfdnujA1Q==",
      "requires": {
        "commander": "2.3.0",
        "debug": "2.2.0",
        "diff": "1.4.0",
        "escape-string-regexp": "1.0.2",
        "glob": "3.2.11",
        "growl": "1.9.2",
        "jade": "0.26.3",
        "mkdirp": "0.5.1",
        "supports-color": "1.2.0",
        "to-iso-string": "0.0.2"
      },
      "dependencies": {
        "commander": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/commander/-/commander-2.3.0.tgz",
          "integrity": "sha512-CD452fnk0jQyk3NfnK+KkR/hUPoHt5pVaKHogtyyv3N0U4QfAal9W0/rXLOg/vVZgQKa7jdtXypKs1YAip11uQ=="
        },
        "debug": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.2.0.tgz",
          "integrity": "sha512-X0rGvJcskG1c3TgSCPqHJ0XJgwlcvOC7elJ5Y0hYuKBZoVqWpAMfLOeIh2UI/DCQ5ruodIjvsugZtjUYUw2pUw==",
          "requires": {
            "ms": "0.7.1"
          }
        },
        "escape-string-regexp": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.2.tgz",
          "integrity": "sha512-cQpUid7bdTUnFin8S7BnNdOk+/eDqQmKgCANSyd/jAhrKEvxUvr9VQ8XZzXiOtest8NLfk3FSBZzwvemZNQ6Vg=="
        },
        "glob": {
          "version": "3.2.11",
          "resolved": "https://registry.npmjs.org/glob/-/glob-3.2.11.tgz",
          "integrity": "sha512-hVb0zwEZwC1FXSKRPFTeOtN7AArJcJlI6ULGLtrstaswKNlrTJqAA+1lYlSUop4vjA423xlBzqfVS3iWGlqJ+g==",
          "requires": {
            "inherits": "2",
            "minimatch": "0.3"
          }
        },
        "lru-cache": {
          "version": "2.7.3",
          "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-2.7.3.tgz",
          "integrity": "sha512-WpibWJ60c3AgAz8a2iYErDrcT2C7OmKnsWhIcHOjkUHFjkXncJhtLxNSqUmxRxRunpb5I8Vprd7aNSd2NtksJQ=="
        },
        "minimatch": {
          "version": "0.3.0",
          "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-0.3.0.tgz",
          "integrity": "sha512-WFX1jI1AaxNTZVOHLBVazwTWKaQjoykSzCBNXB72vDTCzopQGtyP91tKdFK5cv1+qMwPyiTu1HqUriqplI8pcA==",
          "requires": {
            "lru-cache": "2",
            "sigmund": "~1.0.0"
          }
        },
        "minimist": {
          "version": "0.0.8",
          "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz",
          "integrity": "sha512-miQKw5Hv4NS1Psg2517mV4e4dYNaO3++hjAvLOAzKqZ61rH8NS1SK+vbfBWZ5PY/Me/bEWhUwqMghEW5Fb9T7Q=="
        },
        "mkdirp": {
          "version": "0.5.1",
          "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz",
          "integrity": "sha512-SknJC52obPfGQPnjIkXbmA6+5H15E+fR+E4iR2oQ3zzCLbd7/ONua69R/Gw7AgkTLsRG+r5fzksYwWe1AgTyWA==",
          "requires": {
            "minimist": "0.0.8"
          }
        },
        "ms": {
          "version": "0.7.1",
          "resolved": "https://registry.npmjs.org/ms/-/ms-0.7.1.tgz",
          "integrity": "sha512-lRLiIR9fSNpnP6TC4v8+4OU7oStC01esuNowdQ34L+Gk8e5Puoc88IqJ+XAY/B3Mn2ZKis8l8HX90oU8ivzUHg=="
        },
        "supports-color": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-1.2.0.tgz",
          "integrity": "sha512-mS5xsnjTh5b7f2DM6bch6lR582UCOTphzINlZnDsfpIRrwI6r58rb6YSSGsdexkm8qw2bBVO2ID2fnJOTuLiPA=="
        }
      }
    },
    "moment": {
      "version": "2.29.4",
      "resolved": "https://registry.npmjs.org/moment/-/moment-2.29.4.tgz",
      "integrity": "sha512-5LC9SOxjSc2HF6vO2CyuTDNivEdoz2IvyJJGj6X8DJ0eFyfszE0QiEd+iXmBvUP3WHxSjFH/vIsA0EN00cgr8w=="
    },
    "move-concurrently": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
      "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1",
        "copy-concurrently": "^1.0.0",
        "fs-write-stream-atomic": "^1.0.8",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.3"
      },
      "dependencies": {
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
          "dev": true
        },
        "rimraf": {
          "version": "2.7.1",
          "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
          "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
          "dev": true,
          "requires": {
            "glob": "^7.1.3"
          }
        }
      }
    },
    "ms": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
      "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
    },
    "multipipe": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/multipipe/-/multipipe-1.0.2.tgz",
      "integrity": "sha1-zBPv2DPJzamfIk+GhGG44aP9k50=",
      "requires": {
        "duplexer2": "^0.1.2",
        "object-assign": "^4.1.0"
      }
    },
    "mute-stream": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.8.tgz",
      "integrity": "sha512-nnbWWOkoWyUsTjKrhgD0dcz22mdkSnpYqbEjIm2nhwhuxlSkpywJmBo8h0ZqJdkp73mb90SssHkN4rsRaBAfAA=="
    },
    "nan": {
      "version": "2.15.0",
      "resolved": "https://registry.npmjs.org/nan/-/nan-2.15.0.tgz",
      "integrity": "sha512-8ZtvEnA2c5aYCZYd1cvgdnU6cqwixRoYg70xPLWUws5ORTa/lnw+u4amixRS/Ac5U5mQVgp9pnlSUnbNWFaWZQ=="
    },
    "nanomatch": {
      "version": "1.2.13",
      "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
      "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
      "dev": true,
      "requires": {
        "arr-diff": "^4.0.0",
        "array-unique": "^0.3.2",
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "fragment-cache": "^0.2.1",
        "is-windows": "^1.0.2",
        "kind-of": "^6.0.2",
        "object.pick": "^1.3.0",
        "regex-not": "^1.0.0",
        "snapdragon": "^0.8.1",
        "to-regex": "^3.0.1"
      }
    },
    "napi-build-utils": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/napi-build-utils/-/napi-build-utils-1.0.2.tgz",
      "integrity": "sha512-ONmRUqK7zj7DWX0D9ADe03wbwOBZxNAfF20PlGfCWQcD3+/MakShIHrMqx9YwPTfxDdF1zLeL+RGZiR9kGMLdg=="
    },
    "negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg=="
    },
    "neo-async": {
      "version": "2.6.2",
      "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.2.tgz",
      "integrity": "sha512-Yd3UES5mWCSqR+qNT93S3UoYUkqAZ9lLg8a7g9rimsWmYGK8cVToA4/sF3RrshdyV3sAGMXVUmpMYOw+dLpOuw==",
      "dev": true
    },
    "nice-try": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/nice-try/-/nice-try-1.0.5.tgz",
      "integrity": "sha512-1nh45deeb5olNY7eX82BkPO7SSxR5SSYJiPTrTdFUVYwAl8CKMA5N9PjTYkHiRjisVcxcQ1HXdLhx2qxxJzLNQ==",
      "dev": true
    },
    "no-case": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/no-case/-/no-case-2.3.2.tgz",
      "integrity": "sha512-rmTZ9kz+f3rCvK2TD1Ue/oZlns7OGoIWP4fc3llxxRXlOkHKoWPPWJOfFYpITabSow43QJbRIoHQXtt10VldyQ==",
      "requires": {
        "lower-case": "^1.1.1"
      }
    },
    "node-abi": {
      "version": "2.30.1",
      "resolved": "https://registry.npmjs.org/node-abi/-/node-abi-2.30.1.tgz",
      "integrity": "sha512-/2D0wOQPgaUWzVSVgRMx+trKJRC2UG4SUc4oCJoXx9Uxjtp0Vy3/kt7zcbxHF8+Z/pK3UloLWzBISg72brfy1w==",
      "requires": {
        "semver": "^5.4.1"
      },
      "dependencies": {
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ=="
        }
      }
    },
    "node-addon-api": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-5.1.0.tgz",
      "integrity": "sha512-eh0GgfEkpnoWDq+VY8OyvYhFEzBk6jIYbRKdIlyTiAXIVJ8PyBaKb0rp7oDtoddbdoHWhq8wwr+XZ81F1rpNdA=="
    },
    "node-fetch": {
      "version": "2.6.7",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.7.tgz",
      "integrity": "sha512-ZjMPFEfVx5j+y2yF35Kzx5sF7kDzxuDj6ziH4FFbOp87zKDZNx8yExJIb05OGF4Nlt9IHFIMBkRl41VdvcNdbQ==",
      "requires": {
        "whatwg-url": "^5.0.0"
      },
      "dependencies": {
        "tr46": {
          "version": "0.0.3",
          "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
          "integrity": "sha1-gYT9NH2snNwYWZLzpmIuFLnZq2o="
        },
        "webidl-conversions": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
          "integrity": "sha1-JFNCdeKnvGvnvIZhHMFq4KVlSHE="
        },
        "whatwg-url": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
          "integrity": "sha1-lmRU6HZUYuN2RNNib2dCzotwll0=",
          "requires": {
            "tr46": "~0.0.3",
            "webidl-conversions": "^3.0.0"
          }
        }
      }
    },
    "node-forge": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.10.0.tgz",
      "integrity": "sha512-PPmu8eEeG9saEUvI97fm4OYxXVB6bFvyNTyiUOBichBpFG8A1Ljw3bY62+5oOjDEMHRnd0Y7HQ+x7uzxOzC6JA=="
    },
    "node-gyp": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/node-gyp/-/node-gyp-3.8.0.tgz",
      "integrity": "sha512-3g8lYefrRRzvGeSowdJKAKyks8oUpLEd/DyPV4eMhVlhJ0aNaZqIrNUIPuEWWTAoPqyFkfGrM67MC69baqn6vA==",
      "dev": true,
      "requires": {
        "fstream": "^1.0.0",
        "glob": "^7.0.3",
        "graceful-fs": "^4.1.2",
        "mkdirp": "^0.5.0",
        "nopt": "2 || 3",
        "npmlog": "0 || 1 || 2 || 3 || 4",
        "osenv": "0",
        "request": "^2.87.0",
        "rimraf": "2",
        "semver": "~5.3.0",
        "tar": "^2.0.0",
        "which": "1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
          "dev": true
        },
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
          "dev": true
        },
        "are-we-there-yet": {
          "version": "1.1.7",
          "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-1.1.7.tgz",
          "integrity": "sha512-nxwy40TuMiUGqMyRHgCSWZ9FM4VAoRP4xUYSTv5ImRog+h9yISPbVH7H8fASCIzYn9wlEv4zvFL7uKDMCFQm3g==",
          "dev": true,
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "gauge": {
          "version": "2.7.4",
          "resolved": "https://registry.npmjs.org/gauge/-/gauge-2.7.4.tgz",
          "integrity": "sha1-LANAXHU4w51+s3sxcCLjJfsBi/c=",
          "dev": true,
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
          "dev": true,
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "nopt": {
          "version": "3.0.6",
          "resolved": "https://registry.npmjs.org/nopt/-/nopt-3.0.6.tgz",
          "integrity": "sha1-xkZdvwirzU2zWTF/eaxopkayj/k=",
          "dev": true,
          "requires": {
            "abbrev": "1"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-4.1.2.tgz",
          "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
          "dev": true,
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "rimraf": {
          "version": "2.7.1",
          "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
          "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
          "dev": true,
          "requires": {
            "glob": "^7.1.3"
          }
        },
        "semver": {
          "version": "5.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.3.0.tgz",
          "integrity": "sha1-myzl094C0XxgEq0yaqa00M9U+U8=",
          "dev": true
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "dev": true,
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
          "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "tar": {
          "version": "2.2.2",
          "resolved": "https://registry.npmjs.org/tar/-/tar-2.2.2.tgz",
          "integrity": "sha512-FCEhQ/4rE1zYv9rYXJw/msRqsnmlje5jHP6huWeBZ704jUTy02c5AZyWujpMR1ax6mVw9NyJMfuK2CMDWVIfgA==",
          "dev": true,
          "requires": {
            "block-stream": "*",
            "fstream": "^1.0.12",
            "inherits": "2"
          }
        }
      }
    },
    "node-libs-browser": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.2.1.tgz",
      "integrity": "sha512-h/zcD8H9kaDZ9ALUWwlBUDo6TKF8a7qBSCSEGfjTVIYeqsioSKaAX+BN7NgiMGp6iSIXZ3PxgCu8KS3b71YK5Q==",
      "dev": true,
      "requires": {
        "assert": "^1.1.1",
        "browserify-zlib": "^0.2.0",
        "buffer": "^4.3.0",
        "console-browserify": "^1.1.0",
        "constants-browserify": "^1.0.0",
        "crypto-browserify": "^3.11.0",
        "domain-browser": "^1.1.1",
        "events": "^3.0.0",
        "https-browserify": "^1.0.0",
        "os-browserify": "^0.3.0",
        "path-browserify": "0.0.1",
        "process": "^0.11.10",
        "punycode": "^1.2.4",
        "querystring-es3": "^0.2.0",
        "readable-stream": "^2.3.3",
        "stream-browserify": "^2.0.1",
        "stream-http": "^2.7.2",
        "string_decoder": "^1.0.0",
        "timers-browserify": "^2.0.4",
        "tty-browserify": "0.0.0",
        "url": "^0.11.0",
        "util": "^0.11.0",
        "vm-browserify": "^1.0.1"
      },
      "dependencies": {
        "events": {
          "version": "3.3.0",
          "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
          "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
          "dev": true
        },
        "punycode": {
          "version": "1.4.1",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
          "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4=",
          "dev": true
        },
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "url": {
          "version": "0.11.0",
          "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
          "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
          "dev": true,
          "requires": {
            "punycode": "1.3.2",
            "querystring": "0.2.0"
          },
          "dependencies": {
            "punycode": {
              "version": "1.3.2",
              "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
              "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0=",
              "dev": true
            }
          }
        }
      }
    },
    "node-releases": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.2.tgz",
      "integrity": "sha512-XxYDdcQ6eKqp/YjI+tb2C5WM2LgjnZrfYg4vgQt49EK268b6gYCHsBLrK2qvJo4FmCtqmKezb0WZFK4fkrZNsg==",
      "dev": true
    },
    "node-sass": {
      "version": "4.14.1",
      "resolved": "https://registry.npmjs.org/node-sass/-/node-sass-4.14.1.tgz",
      "integrity": "sha512-sjCuOlvGyCJS40R8BscF5vhVlQjNN069NtQ1gSxyK1u9iqvn6tf7O1R4GNowVZfiZUCRt5MmMs1xd+4V/7Yr0g==",
      "dev": true,
      "requires": {
        "async-foreach": "^0.1.3",
        "chalk": "^1.1.1",
        "cross-spawn": "^3.0.0",
        "gaze": "^1.0.0",
        "get-stdin": "^4.0.1",
        "glob": "^7.0.3",
        "in-publish": "^2.0.0",
        "lodash": "^4.17.15",
        "meow": "^3.7.0",
        "mkdirp": "^0.5.1",
        "nan": "^2.13.2",
        "node-gyp": "^3.8.0",
        "npmlog": "^4.0.0",
        "request": "^2.88.0",
        "sass-graph": "2.2.5",
        "stdout-stream": "^1.4.0",
        "true-case-path": "^1.0.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
          "dev": true
        },
        "ansi-styles": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
          "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4=",
          "dev": true
        },
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
          "dev": true
        },
        "are-we-there-yet": {
          "version": "1.1.7",
          "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-1.1.7.tgz",
          "integrity": "sha512-nxwy40TuMiUGqMyRHgCSWZ9FM4VAoRP4xUYSTv5ImRog+h9yISPbVH7H8fASCIzYn9wlEv4zvFL7uKDMCFQm3g==",
          "dev": true,
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "chalk": {
          "version": "1.1.3",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
          "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
          "dev": true,
          "requires": {
            "ansi-styles": "^2.2.1",
            "escape-string-regexp": "^1.0.2",
            "has-ansi": "^2.0.0",
            "strip-ansi": "^3.0.0",
            "supports-color": "^2.0.0"
          }
        },
        "escape-string-regexp": {
          "version": "1.0.5",
          "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
          "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ=",
          "dev": true
        },
        "gauge": {
          "version": "2.7.4",
          "resolved": "https://registry.npmjs.org/gauge/-/gauge-2.7.4.tgz",
          "integrity": "sha1-LANAXHU4w51+s3sxcCLjJfsBi/c=",
          "dev": true,
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
          "dev": true,
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-4.1.2.tgz",
          "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
          "dev": true,
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
          "dev": true,
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
          "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
          "dev": true,
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "supports-color": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
          "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc=",
          "dev": true
        }
      }
    },
    "noop-logger": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/noop-logger/-/noop-logger-0.1.1.tgz",
      "integrity": "sha512-6kM8CLXvuW5crTxsAtva2YLrRrDaiTIkIePWs9moLHqbFWT94WpNFjwS/5dfLfECg5i/lkmw3aoqVidxt23TEQ=="
    },
    "nopt": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/nopt/-/nopt-5.0.0.tgz",
      "integrity": "sha512-Tbj67rffqceeLpcRXrT7vKAN8CwfPeIBgM7E6iBkmKLV7bEMwpGgYLGv0jACUsECaa/vuxP0IjEont6umdMgtQ==",
      "requires": {
        "abbrev": "1"
      }
    },
    "normalize-package-data": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.5.0.tgz",
      "integrity": "sha512-/5CMN3T0R4XTj4DcGaexo+roZSdSFW/0AOOTROrjxzCG1wrWXEsGbRKevjlIL+ZDE4sZlJr5ED4YW0yqmkK+eA==",
      "dev": true,
      "requires": {
        "hosted-git-info": "^2.1.4",
        "resolve": "^1.10.0",
        "semver": "2 || 3 || 4 || 5",
        "validate-npm-package-license": "^3.0.1"
      },
      "dependencies": {
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
          "dev": true
        }
      }
    },
    "normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true
    },
    "npmlog": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-5.0.1.tgz",
      "integrity": "sha512-AqZtDUWOMKs1G/8lwylVjrdYgqA4d9nu8hc+0gzRxlDb1I10+FHBGMXs6aiQHFdCUUlqH99MUMuLfzWDNDtfxw==",
      "requires": {
        "are-we-there-yet": "^2.0.0",
        "console-control-strings": "^1.1.0",
        "gauge": "^3.0.0",
        "set-blocking": "^2.0.0"
      }
    },
    "nth-check": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/nth-check/-/nth-check-1.0.2.tgz",
      "integrity": "sha512-WeBOdju8SnzPN5vTUJYxYUxLeXpCaVP5i5e0LF8fg7WORF2Wd7wFX/pk0tYZk7s8T+J7VLy0Da6J1+wCT0AtHg==",
      "requires": {
        "boolbase": "~1.0.0"
      }
    },
    "null-loader": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/null-loader/-/null-loader-0.1.1.tgz",
      "integrity": "sha1-F76av80/8OFRL2/Er8sfUDk3j64=",
      "dev": true
    },
    "number-is-nan": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/number-is-nan/-/number-is-nan-1.0.1.tgz",
      "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0="
    },
    "nwsapi": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/nwsapi/-/nwsapi-2.2.4.tgz",
      "integrity": "sha512-NHj4rzRo0tQdijE9ZqAx6kYDcoRwYwSYzCA8MY3JzfxlrvEU0jhnhJT9BhqhJs7I/dKcrDm6TyulaRqZPIhN5g=="
    },
    "oauth-sign": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
      "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ=="
    },
    "object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM="
    },
    "object-copy": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
      "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
      "dev": true,
      "requires": {
        "copy-descriptor": "^0.1.0",
        "define-property": "^0.2.5",
        "kind-of": "^3.0.3"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^0.1.6",
            "is-data-descriptor": "^0.1.4",
            "kind-of": "^5.0.0"
          },
          "dependencies": {
            "kind-of": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
              "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
              "dev": true
            }
          }
        },
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "object-inspect": {
      "version": "1.12.3",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.12.3.tgz",
      "integrity": "sha512-geUvdk7c+eizMNUDkRpW1wJwgfOiOeHbxBR/hLXK1aT6zmVSO0jsQcs7fj6MGw89jC/cjGfLcNOrtMYtGqm81g=="
    },
    "object-is": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/object-is/-/object-is-1.1.5.tgz",
      "integrity": "sha512-3cyDsyHgtmi7I7DfSSI2LDp6SK2lwvtbg0p0R1e0RvTqF5ceGx+K2dfSjm1bKDMVCFEDAQvy+o8c6a7VujOddw==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.3"
      }
    },
    "object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
    },
    "object-path": {
      "version": "0.11.8",
      "resolved": "https://registry.npmjs.org/object-path/-/object-path-0.11.8.tgz",
      "integrity": "sha512-YJjNZrlXJFM42wTBn6zgOJVar9KFJvzx6sTWDte8sWZF//cnjl0BxHNpfZx+ZffXX63A9q0b1zsFiBX4g4X5KA=="
    },
    "object-visit": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
      "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
      "dev": true,
      "requires": {
        "isobject": "^3.0.0"
      }
    },
    "object.assign": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.2.tgz",
      "integrity": "sha512-ixT2L5THXsApyiUPYKmW+2EHpXXe5Ii3M+f4e+aJFAHao5amFRW6J0OO6c/LU8Be47utCx2GL89hxGB6XSmKuQ==",
      "dev": true,
      "requires": {
        "call-bind": "^1.0.0",
        "define-properties": "^1.1.3",
        "has-symbols": "^1.0.1",
        "object-keys": "^1.1.1"
      }
    },
    "object.getownpropertydescriptors": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/object.getownpropertydescriptors/-/object.getownpropertydescriptors-2.1.6.tgz",
      "integrity": "sha512-lq+61g26E/BgHv0ZTFgRvi7NMEPuAxLkFU7rukXjc/AlwH4Am5xXVnIXy3un1bg/JPbXHrixRkK1itUzzPiIjQ==",
      "requires": {
        "array.prototype.reduce": "^1.0.5",
        "call-bind": "^1.0.2",
        "define-properties": "^1.2.0",
        "es-abstract": "^1.21.2",
        "safe-array-concat": "^1.0.0"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        }
      }
    },
    "object.pick": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
      "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
      "dev": true,
      "requires": {
        "isobject": "^3.0.1"
      }
    },
    "object.values": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.1.6.tgz",
      "integrity": "sha512-FVVTkD1vENCsAcwNs9k6jea2uHC/X0+JcjG8YA60FN5CMaJmG95wT9jek/xX9nornqGRrBkKtzuAu2wuHpKqvw==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.4",
        "es-abstract": "^1.20.4"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        }
      }
    },
    "on-finished": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
      "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",
      "requires": {
        "ee-first": "1.1.1"
      }
    },
    "once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
      "requires": {
        "wrappy": "1"
      }
    },
    "one-time": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/one-time/-/one-time-1.0.0.tgz",
      "integrity": "sha512-5DXOiRKwuSEcQ/l0kGCF6Q3jcADFv5tSmRaJck/OqkVFcOzutB134KRSfF0xDrL39MNnqxbHBbUUcjZIhTgb2g==",
      "requires": {
        "fn.name": "1.x.x"
      }
    },
    "onetime": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz",
      "integrity": "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==",
      "requires": {
        "mimic-fn": "^2.1.0"
      }
    },
    "opener": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/opener/-/opener-1.5.2.tgz",
      "integrity": "sha512-ur5UIdyw5Y7yEj9wLzhqXiy6GZ3Mwx0yGI+5sMn2r0N0v3cKJvUmFH5yPP+WXh9e0xfyzyJX95D8l088DNFj7A==",
      "dev": true
    },
    "optionator": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.3.tgz",
      "integrity": "sha512-+IW9pACdk3XWmmTXG8m3upGUJst5XRGzxMRjXzAuJ1XnIFNvfhjjIuYkDvysnPQ7qzqVzLt78BCruntqRhWQbA==",
      "requires": {
        "deep-is": "~0.1.3",
        "fast-levenshtein": "~2.0.6",
        "levn": "~0.3.0",
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2",
        "word-wrap": "~1.2.3"
      }
    },
    "os-browserify": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
      "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc=",
      "dev": true
    },
    "os-homedir": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/os-homedir/-/os-homedir-1.0.2.tgz",
      "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M=",
      "dev": true
    },
    "os-tmpdir": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz",
      "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ=",
      "dev": true
    },
    "osenv": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/osenv/-/osenv-0.1.5.tgz",
      "integrity": "sha512-0CWcCECdMVc2Rw3U5w9ZjqX6ga6ubk1xDVKxtBQPK7wis/0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g==",
      "dev": true,
      "requires": {
        "os-homedir": "^1.0.0",
        "os-tmpdir": "^1.0.0"
      }
    },
    "p-limit": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
      "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
      "dev": true,
      "requires": {
        "p-try": "^2.0.0"
      }
    },
    "p-locate": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-4.1.0.tgz",
      "integrity": "sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==",
      "dev": true,
      "requires": {
        "p-limit": "^2.2.0"
      }
    },
    "p-try": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
      "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
      "dev": true
    },
    "packet-reader": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/packet-reader/-/packet-reader-1.0.0.tgz",
      "integrity": "sha512-HAKu/fG3HpHFO0AA8WE8q2g+gBJaZ9MG7fcKk+IJPLTGAD6Psw4443l+9DGRbOIh3/aXr7Phy0TjilYivJo5XQ=="
    },
    "pako": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.11.tgz",
      "integrity": "sha512-4hLB8Py4zZce5s4yd9XzopqwVv/yGNhV1Bl8NTmCq1763HeK2+EwVTv+leGeL13Dnh2wfbqowVPXCIO0z4taYw==",
      "dev": true
    },
    "parallel-transform": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.2.0.tgz",
      "integrity": "sha512-P2vSmIu38uIlvdcU7fDkyrxj33gTUy/ABO5ZUbGowxNCopBq/OoD42bP4UmMrJoPyk4Uqf0mu3mtWBhHCZD8yg==",
      "dev": true,
      "requires": {
        "cyclist": "^1.0.1",
        "inherits": "^2.0.3",
        "readable-stream": "^2.1.5"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "param-case": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/param-case/-/param-case-2.1.1.tgz",
      "integrity": "sha512-eQE845L6ot89sk2N8liD8HAuH4ca6Vvr7VWAWwt7+kvvG5aBcPmmphQ68JsEG2qa9n1TykS2DLeMt363AAH8/w==",
      "requires": {
        "no-case": "^2.2.0"
      }
    },
    "parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "requires": {
        "callsites": "^3.0.0"
      }
    },
    "parse-asn1": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.6.tgz",
      "integrity": "sha512-RnZRo1EPU6JBnra2vGHj0yhp6ebyjBZpmUCLHWiFhxlzvBCCpAuZ7elsBp1PVAbQN0/04VD/19rfzlBSwLstMw==",
      "dev": true,
      "requires": {
        "asn1.js": "^5.2.0",
        "browserify-aes": "^1.0.0",
        "evp_bytestokey": "^1.0.0",
        "pbkdf2": "^3.0.3",
        "safe-buffer": "^5.1.1"
      }
    },
    "parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      }
    },
    "parse-passwd": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/parse-passwd/-/parse-passwd-1.0.0.tgz",
      "integrity": "sha1-bVuTSkVpk7I9N/QKOC1vFmao5cY=",
      "dev": true
    },
    "parse5": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",
      "integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA=="
    },
    "parseqs": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/parseqs/-/parseqs-0.0.6.tgz",
      "integrity": "sha512-jeAGzMDbfSHHA091hr0r31eYfTig+29g3GKKE/PPbEQ65X0lmMwlEoqmhzu0iztID5uJpZsFlUPDP8ThPL7M8w=="
    },
    "parseuri": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/parseuri/-/parseuri-0.0.6.tgz",
      "integrity": "sha512-AUjen8sAkGgao7UyCX6Ahv0gIK2fABKmYjvP4xmy5JaKvcbTRueIqIPHLAfq30xJddqSE033IOMUSOMCcK3Sow=="
    },
    "parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ=="
    },
    "pascalcase": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
      "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ=",
      "dev": true
    },
    "path-browserify": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.1.tgz",
      "integrity": "sha512-BapA40NHICOS+USX9SN4tyhq+A2RrN/Ws5F0Z5aMHDp98Fl86lX8Oti8B7uN93L4Ifv4fHOEA+pQw87gmMO/lQ==",
      "dev": true
    },
    "path-dirname": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
      "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA=",
      "dev": true,
      "optional": true
    },
    "path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true
    },
    "path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18="
    },
    "path-key": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-2.0.1.tgz",
      "integrity": "sha1-QRyttXTFoUDTpLGRDUDYDMn0C0A=",
      "dev": true
    },
    "path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw=="
    },
    "path-to-regexp": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
      "integrity": "sha1-32BBeABfUi8V60SQ5yR6G/qmf4w="
    },
    "path-type": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
      "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw=="
    },
    "pbkdf2": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.1.2.tgz",
      "integrity": "sha512-iuh7L6jA7JEGu2WxDwtQP1ddOpaJNC4KlDEFfdQajSGgGPNi4OyDc2R7QnbY2bR9QjBVGwgvTdNJZoE7RaxUMA==",
      "dev": true,
      "requires": {
        "create-hash": "^1.1.2",
        "create-hmac": "^1.1.4",
        "ripemd160": "^2.0.1",
        "safe-buffer": "^5.0.1",
        "sha.js": "^2.4.8"
      }
    },
    "pend": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/pend/-/pend-1.2.0.tgz",
      "integrity": "sha1-elfrVQpng/kRUzH89GY9XI4AelA=",
      "dev": true
    },
    "performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
    },
    "pg": {
      "version": "8.10.0",
      "resolved": "https://registry.npmjs.org/pg/-/pg-8.10.0.tgz",
      "integrity": "sha512-ke7o7qSTMb47iwzOSaZMfeR7xToFdkE71ifIipOAAaLIM0DYzfOAXlgFFmYUIE2BcJtvnVlGCID84ZzCegE8CQ==",
      "requires": {
        "buffer-writer": "2.0.0",
        "packet-reader": "1.0.0",
        "pg-connection-string": "^2.5.0",
        "pg-pool": "^3.6.0",
        "pg-protocol": "^1.6.0",
        "pg-types": "^2.1.0",
        "pgpass": "1.x"
      }
    },
    "pg-connection-string": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/pg-connection-string/-/pg-connection-string-2.5.0.tgz",
      "integrity": "sha512-r5o/V/ORTA6TmUnyWZR9nCj1klXCO2CEKNRlVuJptZe85QuhFayC7WeMic7ndayT5IRIR0S0xFxFi2ousartlQ=="
    },
    "pg-int8": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/pg-int8/-/pg-int8-1.0.1.tgz",
      "integrity": "sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw=="
    },
    "pg-pool": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/pg-pool/-/pg-pool-3.6.0.tgz",
      "integrity": "sha512-clFRf2ksqd+F497kWFyM21tMjeikn60oGDmqMT8UBrynEwVEX/5R5xd2sdvdo1cZCFlguORNpVuqxIj+aK4cfQ=="
    },
    "pg-protocol": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/pg-protocol/-/pg-protocol-1.6.0.tgz",
      "integrity": "sha512-M+PDm637OY5WM307051+bsDia5Xej6d9IR4GwJse1qA1DIhiKlksvrneZOYQq42OM+spubpcNYEo2FcKQrDk+Q=="
    },
    "pg-types": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pg-types/-/pg-types-2.2.0.tgz",
      "integrity": "sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==",
      "requires": {
        "pg-int8": "1.0.1",
        "postgres-array": "~2.0.0",
        "postgres-bytea": "~1.0.0",
        "postgres-date": "~1.0.4",
        "postgres-interval": "^1.1.0"
      }
    },
    "pgpass": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/pgpass/-/pgpass-1.0.5.tgz",
      "integrity": "sha512-FdW9r/jQZhSeohs1Z3sI1yxFQNFvMcnmfuj4WBMUTxOrAyLMaTcE1aAMBiTlbMNaXvBCQuVi0R7hd8udDSP7ug==",
      "requires": {
        "split2": "^4.1.0"
      }
    },
    "picocolors": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.0.0.tgz",
      "integrity": "sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ==",
      "dev": true
    },
    "picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "optional": true
    },
    "pify": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
      "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
    },
    "pinkie": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
      "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA=",
      "dev": true
    },
    "pinkie-promise": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
      "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
      "dev": true,
      "requires": {
        "pinkie": "^2.0.0"
      }
    },
    "pkg-dir": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-4.2.0.tgz",
      "integrity": "sha512-HRDzbaKjC+AOWVXxAU/x54COGeIv9eb+6CkDSQoNTt4XyWoIJvuPsXizxu/Fr23EiekbtZwmh1IcIG/l/a10GQ==",
      "dev": true,
      "requires": {
        "find-up": "^4.0.0"
      }
    },
    "pkgcloud": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pkgcloud/-/pkgcloud-2.2.0.tgz",
      "integrity": "sha512-ZbbGqJA8gMwR0peq57aNbjzgLbDj52oi59QJEShZmGUl3ckFBZ92j0h/C2L0tJeCb2VE12tnTwmftBgQ0f3gNw==",
      "requires": {
        "@google-cloud/storage": "^2.4.3",
        "async": "^2.6.1",
        "aws-sdk": "^2.382.0",
        "errs": "^0.3.2",
        "eventemitter2": "^5.0.1",
        "fast-json-patch": "^2.1.0",
        "filed-mimefix": "^0.1.3",
        "ip": "^1.1.5",
        "liboneandone": "^1.2.0",
        "lodash": "^4.17.10",
        "mime": "^2.4.1",
        "qs": "^6.5.2",
        "request": "^2.88.0",
        "through2": "^3.0.1",
        "url-join": "^4.0.0",
        "xml2js": "^0.4.19"
      },
      "dependencies": {
        "through2": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/through2/-/through2-3.0.2.tgz",
          "integrity": "sha512-enaDQ4MUyP2W6ZyT6EsMzqBPZaM/avg8iuo+l2d3QCs0J+6RaqkHV/2/lOwDTueBHeJ/2LG9lrLW3d5rWPucuQ==",
          "requires": {
            "inherits": "^2.0.4",
            "readable-stream": "2 || 3"
          }
        }
      }
    },
    "pn": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/pn/-/pn-1.1.0.tgz",
      "integrity": "sha512-2qHaIQr2VLRFoxe2nASzsV6ef4yOOH+Fi9FBOVH6cqeSgUnoyySPZkxzLuzd+RYOQTRpROA0ztTMqxROKSb/nA=="
    },
    "posix-character-classes": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
      "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs=",
      "dev": true
    },
    "postcss": {
      "version": "7.0.39",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-7.0.39.tgz",
      "integrity": "sha512-yioayjNbHn6z1/Bywyb2Y4s3yvDAeXGOyxqD+LnVOinq6Mdmd++SW2wUNVzavyyHxd6+DxzWGIuosg6P1Rj8uA==",
      "dev": true,
      "requires": {
        "picocolors": "^0.2.1",
        "source-map": "^0.6.1"
      },
      "dependencies": {
        "picocolors": {
          "version": "0.2.1",
          "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-0.2.1.tgz",
          "integrity": "sha512-cMlDqaLEqfSaW8Z7N5Jw+lyIW869EzT73/F5lhtY9cLGoVxSXznfgfXMO0Z5K0o0Q2TkTXq+0KFsdnSe3jDViA==",
          "dev": true
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "postcss-modules-extract-imports": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-extract-imports/-/postcss-modules-extract-imports-2.0.0.tgz",
      "integrity": "sha512-LaYLDNS4SG8Q5WAWqIJgdHPJrDDr/Lv775rMBFUbgjTz6j34lUznACHcdRWroPvXANP2Vj7yNK57vp9eFqzLWQ==",
      "dev": true,
      "requires": {
        "postcss": "^7.0.5"
      }
    },
    "postcss-modules-local-by-default": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/postcss-modules-local-by-default/-/postcss-modules-local-by-default-2.0.6.tgz",
      "integrity": "sha512-oLUV5YNkeIBa0yQl7EYnxMgy4N6noxmiwZStaEJUSe2xPMcdNc8WmBQuQCx18H5psYbVxz8zoHk0RAAYZXP9gA==",
      "dev": true,
      "requires": {
        "postcss": "^7.0.6",
        "postcss-selector-parser": "^6.0.0",
        "postcss-value-parser": "^3.3.1"
      }
    },
    "postcss-modules-scope": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-scope/-/postcss-modules-scope-2.2.0.tgz",
      "integrity": "sha512-YyEgsTMRpNd+HmyC7H/mh3y+MeFWevy7V1evVhJWewmMbjDHIbZbOXICC2y+m1xI1UVfIT1HMW/O04Hxyu9oXQ==",
      "dev": true,
      "requires": {
        "postcss": "^7.0.6",
        "postcss-selector-parser": "^6.0.0"
      }
    },
    "postcss-modules-values": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postcss-modules-values/-/postcss-modules-values-2.0.0.tgz",
      "integrity": "sha512-Ki7JZa7ff1N3EIMlPnGTZfUMe69FFwiQPnVSXC9mnn3jozCRBYIxiZd44yJOV2AmabOo4qFf8s0dC/+lweG7+w==",
      "dev": true,
      "requires": {
        "icss-replace-symbols": "^1.1.0",
        "postcss": "^7.0.6"
      }
    },
    "postcss-selector-parser": {
      "version": "6.0.9",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.9.tgz",
      "integrity": "sha512-UO3SgnZOVTwu4kyLR22UQ1xZh086RyNZppb7lLAKBFK8a32ttG5i87Y/P3+2bRSjZNyJ1B7hfFNo273tKe9YxQ==",
      "dev": true,
      "requires": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      }
    },
    "postcss-value-parser": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
      "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ==",
      "dev": true
    },
    "postgres-array": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postgres-array/-/postgres-array-2.0.0.tgz",
      "integrity": "sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA=="
    },
    "postgres-bytea": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-1.0.0.tgz",
      "integrity": "sha512-xy3pmLuQqRBZBXDULy7KbaitYqLcmxigw14Q5sj8QBVLqEwXfeybIKVWiqAXTlcvdvb0+xkOtDbfQMOf4lST1w=="
    },
    "postgres-date": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/postgres-date/-/postgres-date-1.0.7.tgz",
      "integrity": "sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q=="
    },
    "postgres-interval": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/postgres-interval/-/postgres-interval-1.2.0.tgz",
      "integrity": "sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==",
      "requires": {
        "xtend": "^4.0.0"
      }
    },
    "prebuild-install": {
      "version": "5.3.6",
      "resolved": "https://registry.npmjs.org/prebuild-install/-/prebuild-install-5.3.6.tgz",
      "integrity": "sha512-s8Aai8++QQGi4sSbs/M1Qku62PFK49Jm1CbgXklGz4nmHveDq0wzJkg7Na5QbnO1uNH8K7iqx2EQ/mV0MZEmOg==",
      "requires": {
        "detect-libc": "^1.0.3",
        "expand-template": "^2.0.3",
        "github-from-package": "0.0.0",
        "minimist": "^1.2.3",
        "mkdirp-classic": "^0.5.3",
        "napi-build-utils": "^1.0.1",
        "node-abi": "^2.7.0",
        "noop-logger": "^0.1.1",
        "npmlog": "^4.0.1",
        "pump": "^3.0.0",
        "rc": "^1.2.7",
        "simple-get": "^3.0.3",
        "tar-fs": "^2.0.0",
        "tunnel-agent": "^0.6.0",
        "which-pm-runs": "^1.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha512-TIGnTpdo+E3+pCyAluZvtED5p5wCqLdezCyhPZzKPcxvFplEt4i+W7OONCKgeZFT3+y5NZZfOOS/Bdcanm1MYA=="
        },
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw=="
        },
        "are-we-there-yet": {
          "version": "1.1.7",
          "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-1.1.7.tgz",
          "integrity": "sha512-nxwy40TuMiUGqMyRHgCSWZ9FM4VAoRP4xUYSTv5ImRog+h9yISPbVH7H8fASCIzYn9wlEv4zvFL7uKDMCFQm3g==",
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "detect-libc": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-1.0.3.tgz",
          "integrity": "sha512-pGjwhsmsp4kL2RTz08wcOlGN83otlqHeD/Z5T8GXZB+/YcpQ/dgo+lbU8ZsGxV0HIvqqxo9l7mqYwyYMD9bKDg=="
        },
        "gauge": {
          "version": "2.7.4",
          "resolved": "https://registry.npmjs.org/gauge/-/gauge-2.7.4.tgz",
          "integrity": "sha512-14x4kjc6lkD3ltw589k0NrPD6cCNTD6CWoVUNpB85+DrtONoZn+Rug6xZU5RvSC4+TZPxA5AnBibQYAvZn41Hg==",
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha512-1pqUqRjkhPJ9miNq9SwMfdvi6lBJcd6eFxvfaivQhaH3SgisfiuudvFntdKOmxuee/77l+FPjKrQjWvmPjWrRw==",
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-4.1.2.tgz",
          "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        },
        "readable-stream": {
          "version": "2.3.8",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.8.tgz",
          "integrity": "sha512-8p0AUk4XODgIewSi0l8Epjs+EVnWiK7NoDIEGU0HhE7+ZyY8D1IMY7odu5lRrFXGg71L15KG8QrPmum45RTtdA==",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha512-0XsVpQLnVCXHJfyEs8tC0zpTVIr5PKKsQtkT29IwupnPTjtPmQ3xT/4yCREF9hYkV/3M3kzcUTSAZT6a6h81tw==",
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
          "integrity": "sha512-VhumSSbBqDTP8p2ZLKj40UjBCV4+v8bUSEpUb4KjRgWk9pbqGF4REFj6KEagidb2f/M6AzC0EmFyDNGaw9OCzg==",
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        }
      }
    },
    "prelude-ls": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
      "integrity": "sha512-ESF23V4SKG6lVSGZgYNpbsiaAkdab6ZgOxe52p7+Kid3W3u3bxR4Vfd/o21dmN7jSt0IwgZ4v5MUd26FEtXE9w=="
    },
    "pretty-bytes": {
      "version": "5.6.0",
      "resolved": "https://registry.npmjs.org/pretty-bytes/-/pretty-bytes-5.6.0.tgz",
      "integrity": "sha512-FFw039TmrBqFK8ma/7OL3sDz/VytdtJr044/QUJtH0wK9lb9jLq9tJyIxUwtQJHwar2BqtiA4iCWSwo9JLkzFg=="
    },
    "private": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/private/-/private-0.1.8.tgz",
      "integrity": "sha512-VvivMrbvd2nKkiG38qjULzlc+4Vx4wm/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/cJPet5J/u19r/mg==",
      "dev": true
    },
    "process": {
      "version": "0.11.10",
      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
      "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI=",
      "dev": true
    },
    "process-nextick-args": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
      "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag=="
    },
    "progress": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",
      "integrity": "sha512-7PiHtLll5LdnKIMw100I+8xJXR5gW2QwWYkT6iJva0bXitZKa/XMrSbdmg3r2Xnaidz9Qumd0VPaMrZlF9V9sA==",
      "dev": true
    },
    "promise-inflight": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
      "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM=",
      "dev": true
    },
    "prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "requires": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      },
      "dependencies": {
        "react-is": {
          "version": "16.13.1",
          "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
          "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="
        }
      }
    },
    "properties-reader": {
      "version": "0.0.16",
      "resolved": "https://registry.npmjs.org/properties-reader/-/properties-reader-0.0.16.tgz",
      "integrity": "sha512-Ti7zzpdF7a3c5T4VqHdDAyBgC3ZpZVasPzaZiLOtFMbIzW5BDbkI3jfCIiANOBEKmbjAq4D+Hs380NmmuaQYoA==",
      "requires": {
        "mkdirp": "~0.5.1"
      }
    },
    "proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "requires": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      }
    },
    "proxy-from-env": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-1.1.0.tgz",
      "integrity": "sha512-D+zkORCbA9f1tdWRK0RaCR3GPv50cMxcrz4X8k5LTSUD1Dkw47mKJEZQNunItRTkWwgtaUSo1RVFRIG9ZXiFYg==",
      "dev": true
    },
    "prr": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
      "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY=",
      "dev": true
    },
    "pseudomap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/pseudomap/-/pseudomap-1.0.2.tgz",
      "integrity": "sha1-8FKijacOYYkX7wqKw0wa5aaChrM=",
      "dev": true
    },
    "psl": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/psl/-/psl-1.8.0.tgz",
      "integrity": "sha512-RIdOzyoavK+hA18OGGWDqUTsCLhtA7IcZ/6NCs4fFJaHBDab+pDDmDIByWFRQJq2Cd7r1OoQxBGKOaztq+hjIQ=="
    },
    "public-encrypt": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
      "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "browserify-rsa": "^4.0.0",
        "create-hash": "^1.1.0",
        "parse-asn1": "^5.0.0",
        "randombytes": "^2.0.1",
        "safe-buffer": "^5.1.2"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.12.0",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
          "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA==",
          "dev": true
        }
      }
    },
    "pump": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
      "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
      "requires": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.1"
      }
    },
    "pumpify": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.5.1.tgz",
      "integrity": "sha512-oClZI37HvuUJJxSKKrC17bZ9Cu0ZYhEAGPsPUy9KlMUmv9dKX2o77RUmq7f3XjIxbwyGwYzbzQ1L2Ks8sIradQ==",
      "requires": {
        "duplexify": "^3.6.0",
        "inherits": "^2.0.3",
        "pump": "^2.0.0"
      }
    },
    "punycode": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
      "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A=="
    },
    "puppeteer": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/puppeteer/-/puppeteer-5.5.0.tgz",
      "integrity": "sha512-OM8ZvTXAhfgFA7wBIIGlPQzvyEETzDjeRa4mZRCRHxYL+GNH5WAuYUQdja3rpWZvkX/JKqmuVgbsxDNsDFjMEg==",
      "dev": true,
      "requires": {
        "debug": "^4.1.0",
        "devtools-protocol": "0.0.818844",
        "extract-zip": "^2.0.0",
        "https-proxy-agent": "^4.0.0",
        "node-fetch": "^2.6.1",
        "pkg-dir": "^4.2.0",
        "progress": "^2.0.1",
        "proxy-from-env": "^1.0.0",
        "rimraf": "^3.0.2",
        "tar-fs": "^2.0.0",
        "unbzip2-stream": "^1.3.3",
        "ws": "^7.2.3"
      },
      "dependencies": {
        "agent-base": {
          "version": "5.1.1",
          "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-5.1.1.tgz",
          "integrity": "sha512-TMeqbNl2fMW0nMjTEPOwe3J/PRFP4vqeoNuQMG0HlMrtm5QxKqdvAkZ1pRBQ/ulIyDD5Yq0nJ7YbdD8ey0TO3g==",
          "dev": true
        },
        "https-proxy-agent": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-4.0.0.tgz",
          "integrity": "sha512-zoDhWrkR3of1l9QAL8/scJZyLu8j/gBkcwcaQOZh7Gyh/+uJQzGVETdgT30akuwkpL8HTRfssqI3BZuV18teDg==",
          "dev": true,
          "requires": {
            "agent-base": "5",
            "debug": "4"
          }
        }
      }
    },
    "q": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/q/-/q-1.5.1.tgz",
      "integrity": "sha512-kV/CThkXo6xyFEZUugw/+pIOywXcDbFYgSct5cT3gqlbkBE1SJdwy6UQoZvodiWF/ckQLZyDE/Bu1M6gVu5lVw=="
    },
    "qs": {
      "version": "6.9.7",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.9.7.tgz",
      "integrity": "sha512-IhMFgUmuNpyRfxA90umL7ByLlgRXu6tIfKPpF5TmcfRLlLCckfP/g3IQmju6jjpu+Hh8rA+2p6A27ZSPOOHdKw=="
    },
    "querystring": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
      "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA="
    },
    "querystring-es3": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
      "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM=",
      "dev": true
    },
    "randombytes": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
      "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
      "dev": true,
      "requires": {
        "safe-buffer": "^5.1.0"
      }
    },
    "randomfill": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
      "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
      "dev": true,
      "requires": {
        "randombytes": "^2.0.5",
        "safe-buffer": "^5.1.0"
      }
    },
    "range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg=="
    },
    "raw-body": {
      "version": "2.4.3",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.4.3.tgz",
      "integrity": "sha512-UlTNLIcu0uzb4D2f4WltY6cVjLi+/jEN4lgEUj3E04tpMDpUlkBo/eSn6zou9hum2VMNpCCUone0O0WeJim07g==",
      "requires": {
        "bytes": "3.1.2",
        "http-errors": "1.8.1",
        "iconv-lite": "0.4.24",
        "unpipe": "1.0.0"
      }
    },
    "rc": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/rc/-/rc-1.2.8.tgz",
      "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
      "requires": {
        "deep-extend": "^0.6.0",
        "ini": "~1.3.0",
        "minimist": "^1.2.0",
        "strip-json-comments": "~2.0.1"
      }
    },
    "react": {
      "version": "17.0.2",
      "resolved": "https://registry.npmjs.org/react/-/react-17.0.2.tgz",
      "integrity": "sha512-gnhPt75i/dq/z3/6q/0asP78D0u592D5L1pd7M8P+dck6Fu/jJeL6iVVK23fptSUZj8Vjf++7wXA8UNclGQcbA==",
      "requires": {
        "loose-envify": "^1.1.0",
        "object-assign": "^4.1.1"
      }
    },
    "react-autosuggest": {
      "version": "9.4.3",
      "resolved": "https://registry.npmjs.org/react-autosuggest/-/react-autosuggest-9.4.3.tgz",
      "integrity": "sha512-wFbp5QpgFQRfw9cwKvcgLR8theikOUkv8PFsuLYqI2PUgVlx186Cz8MYt5bLxculi+jxGGUUVt+h0esaBZZouw==",
      "requires": {
        "prop-types": "^15.5.10",
        "react-autowhatever": "^10.1.2",
        "shallow-equal": "^1.0.0"
      }
    },
    "react-autowhatever": {
      "version": "10.2.1",
      "resolved": "https://registry.npmjs.org/react-autowhatever/-/react-autowhatever-10.2.1.tgz",
      "integrity": "sha512-5gQyoETyBH6GmuW1N1J81CuoAV+Djeg66DEo03xiZOl3WOwJHBP5LisKUvCGOakjrXU4M3hcIvCIqMBYGUmqOA==",
      "requires": {
        "prop-types": "^15.5.8",
        "react-themeable": "^1.1.0",
        "section-iterator": "^2.0.0"
      }
    },
    "react-dom": {
      "version": "17.0.2",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-17.0.2.tgz",
      "integrity": "sha512-s4h96KtLDUQlsENhMn1ar8t2bEa+q/YAtj8pPPdIjPDGBDIVNsrD9aXNWqspUe6AzKCIG0C1HZZLqLV7qpOBGA==",
      "requires": {
        "loose-envify": "^1.1.0",
        "object-assign": "^4.1.1",
        "scheduler": "^0.20.2"
      },
      "dependencies": {
        "scheduler": {
          "version": "0.20.2",
          "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.20.2.tgz",
          "integrity": "sha512-2eWfGgAqqWFGqtdMmcL5zCMK1U8KlXv8SQFGglL3CEtd0aDVDWgeF/YoCmvln55m5zSk3J/20hTaSBeSObsQDQ==",
          "requires": {
            "loose-envify": "^1.1.0",
            "object-assign": "^4.1.1"
          }
        }
      }
    },
    "react-dropzone": {
      "version": "11.7.1",
      "resolved": "https://registry.npmjs.org/react-dropzone/-/react-dropzone-11.7.1.tgz",
      "integrity": "sha512-zxCMwhfPy1olUEbw3FLNPLhAm/HnaYH5aELIEglRbqabizKAdHs0h+WuyOpmA+v1JXn0++fpQDdNfUagWt5hJQ==",
      "requires": {
        "attr-accept": "^2.2.2",
        "file-selector": "^0.4.0",
        "prop-types": "^15.8.1"
      }
    },
    "react-is": {
      "version": "17.0.2",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-17.0.2.tgz",
      "integrity": "sha512-w2GsyukL62IJnlaff/nRegPQR94C/XXamvMWmSHRJ4y7Ts/4ocGRmTHvOs8PSE6pB3dWOrD/nueuU5sduBsQ4w=="
    },
    "react-leaflet": {
      "version": "2.8.0",
      "resolved": "https://registry.npmjs.org/react-leaflet/-/react-leaflet-2.8.0.tgz",
      "integrity": "sha512-Y7oHtNrrlRH8muDttXf+jZ2Ga/X7jneSGi1GN8uEdeCfLProTqgG2Zoa5TfloS3ZnY20v7w+DIenMG59beFsQw==",
      "requires": {
        "@babel/runtime": "^7.12.1",
        "fast-deep-equal": "^3.1.3",
        "hoist-non-react-statics": "^3.3.2",
        "warning": "^4.0.3"
      }
    },
    "react-router": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-5.3.4.tgz",
      "integrity": "sha512-Ys9K+ppnJah3QuaRiLxk+jDWOR1MekYQrlytiXxC1RyfbdsZkS5pvKAzCCr031xHixZwpnsYNT5xysdFHQaYsA==",
      "requires": {
        "@babel/runtime": "^7.12.13",
        "history": "^4.9.0",
        "hoist-non-react-statics": "^3.1.0",
        "loose-envify": "^1.3.1",
        "path-to-regexp": "^1.7.0",
        "prop-types": "^15.6.2",
        "react-is": "^16.6.0",
        "tiny-invariant": "^1.0.2",
        "tiny-warning": "^1.0.0"
      },
      "dependencies": {
        "isarray": {
          "version": "0.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
          "integrity": "sha512-D2S+3GLxWH+uhrNEcoh/fnmYeP8E8/zHl644d/jdA0g2uyXvy3sb0qxotE+ne0LtccHknQzWwZEzhak7oJ0COQ=="
        },
        "path-to-regexp": {
          "version": "1.8.0",
          "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-1.8.0.tgz",
          "integrity": "sha512-n43JRhlUKUAlibEJhPeir1ncUID16QnEjNpwzNdO3Lm4ywrBpBZ5oLD0I6br9evr1Y9JTqwRtAh7JLoOzAQdVA==",
          "requires": {
            "isarray": "0.0.1"
          }
        },
        "react-is": {
          "version": "16.13.1",
          "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
          "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="
        }
      }
    },
    "react-router-dom": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-5.3.4.tgz",
      "integrity": "sha512-m4EqFMHv/Ih4kpcBCONHbkT68KoAeHN4p3lAGoNryfHi0dMy0kCzEZakiKRsvg5wHZ/JLrLW8o8KomWiz/qbYQ==",
      "requires": {
        "@babel/runtime": "^7.12.13",
        "history": "^4.9.0",
        "loose-envify": "^1.3.1",
        "prop-types": "^15.6.2",
        "react-router": "5.3.4",
        "tiny-invariant": "^1.0.2",
        "tiny-warning": "^1.0.0"
      }
    },
    "react-themeable": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/react-themeable/-/react-themeable-1.1.0.tgz",
      "integrity": "sha512-kl5tQ8K+r9IdQXZd8WLa+xxYN04lLnJXRVhHfdgwsUJr/SlKJxIejoc9z9obEkx1mdqbTw1ry43fxEUwyD9u7w==",
      "requires": {
        "object-assign": "^3.0.0"
      },
      "dependencies": {
        "object-assign": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-3.0.0.tgz",
          "integrity": "sha512-jHP15vXVGeVh1HuaA2wY6lxk+whK/x4KBG88VXeRma7CCun7iGD5qPc4eYykQ9sdQvg8jkwFKsSxHln2ybW3xQ=="
        }
      }
    },
    "react-transition-group": {
      "version": "4.4.2",
      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.2.tgz",
      "integrity": "sha512-/RNYfRAMlZwDSr6z4zNKV6xu53/e2BuaBbGhbyYIXTrmgu/bGHzmqOs7mJSJBHy9Ud+ApHx3QjrkKSp1pxvlFg==",
      "requires": {
        "@babel/runtime": "^7.5.5",
        "dom-helpers": "^5.0.1",
        "loose-envify": "^1.4.0",
        "prop-types": "^15.6.2"
      }
    },
    "read": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/read/-/read-1.0.7.tgz",
      "integrity": "sha512-rSOKNYUmaxy0om1BNjMN4ezNT6VKK+2xF4GBhc81mkH7L60i6dp8qPYrkndNLT3QPphoII3maL9PVC9XmhHwVQ==",
      "requires": {
        "mute-stream": "~0.0.4"
      }
    },
    "read-pkg": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-1.1.0.tgz",
      "integrity": "sha1-9f+qXs0pyzHAR0vKfXVra7KePyg=",
      "dev": true,
      "requires": {
        "load-json-file": "^1.0.0",
        "normalize-package-data": "^2.3.2",
        "path-type": "^1.0.0"
      },
      "dependencies": {
        "path-type": {
          "version": "1.1.0",
          "resolved": "https://registry.npmjs.org/path-type/-/path-type-1.1.0.tgz",
          "integrity": "sha1-WcRPfuSR2nBNpBXaWkBwuk+P5EE=",
          "dev": true,
          "requires": {
            "graceful-fs": "^4.1.2",
            "pify": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          }
        },
        "pify": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
          "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw=",
          "dev": true
        }
      }
    },
    "read-pkg-up": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-1.0.1.tgz",
      "integrity": "sha1-nWPBMnbAZZGNV/ACpX9AobZD+wI=",
      "dev": true,
      "requires": {
        "find-up": "^1.0.0",
        "read-pkg": "^1.0.0"
      },
      "dependencies": {
        "find-up": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-1.1.2.tgz",
          "integrity": "sha1-ay6YIrGizgpgq2TWEOzK1TyyTQ8=",
          "dev": true,
          "requires": {
            "path-exists": "^2.0.0",
            "pinkie-promise": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-2.1.0.tgz",
          "integrity": "sha1-D+tsZPD8UY2adU3V77YscCJ2H0s=",
          "dev": true,
          "requires": {
            "pinkie-promise": "^2.0.0"
          }
        }
      }
    },
    "readable-stream": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
      "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
      "requires": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      }
    },
    "readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "optional": true,
      "requires": {
        "picomatch": "^2.2.1"
      }
    },
    "redent": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/redent/-/redent-1.0.0.tgz",
      "integrity": "sha1-z5Fqsf1fHxbfsggi3W7H9zDCr94=",
      "dev": true,
      "requires": {
        "indent-string": "^2.1.0",
        "strip-indent": "^1.0.1"
      }
    },
    "redis": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/redis/-/redis-3.1.2.tgz",
      "integrity": "sha512-grn5KoZLr/qrRQVwoSkmzdbw6pwF+/rwODtrOr6vuBRiR/f3rjSTGupbF90Zpqm2oenix8Do6RV7pYEkGwlKkw==",
      "requires": {
        "denque": "^1.5.0",
        "redis-commands": "^1.7.0",
        "redis-errors": "^1.2.0",
        "redis-parser": "^3.0.0"
      }
    },
    "redis-commands": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/redis-commands/-/redis-commands-1.7.0.tgz",
      "integrity": "sha512-nJWqw3bTFy21hX/CPKHth6sfhZbdiHP6bTawSgQBlKOVRG7EZkfHbbHwQJnrE4vsQf0CMNE+3gJ4Fmm16vdVlQ=="
    },
    "redis-errors": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/redis-errors/-/redis-errors-1.2.0.tgz",
      "integrity": "sha512-1qny3OExCf0UvUV/5wpYKf2YwPcOqXzkwKKSmKHiE6ZMQs5heeE/c8eXK+PNllPvmjgAbfnsbpkGZWy8cBpn9w=="
    },
    "redis-parser": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/redis-parser/-/redis-parser-3.0.0.tgz",
      "integrity": "sha512-DJnGAeenTdpMEH6uAJRK/uiyEIH9WVsUmoLwzudwGJUwZPp80PDBWPHXSAGNPwNvIXAbe7MSUB1zQFugFml66A==",
      "requires": {
        "redis-errors": "^1.0.0"
      }
    },
    "regenerate": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.2.tgz",
      "integrity": "sha512-zrceR/XhGYU/d/opr2EKO7aRHUeiBI8qjtfHqADTwZd6Szfy16la6kqD0MIUs5z5hx6AaKa+PixpPrR289+I0A==",
      "dev": true
    },
    "regenerate-unicode-properties": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/regenerate-unicode-properties/-/regenerate-unicode-properties-10.0.1.tgz",
      "integrity": "sha512-vn5DU6yg6h8hP/2OkQo3K7uVILvY4iu0oI4t3HFa81UPkhGJwkRwM10JEc3upjdhHjs/k8GJY1sRBhk5sr69Bw==",
      "dev": true,
      "requires": {
        "regenerate": "^1.4.2"
      }
    },
    "regenerator-runtime": {
      "version": "0.13.9",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.9.tgz",
      "integrity": "sha512-p3VT+cOEgxFsRRA9X4lkI1E+k2/CtnKtU4gcxyaCUreilL/vqI6CdZ3wxVUx3UOUg+gnUOQQcRI7BmSI656MYA=="
    },
    "regenerator-transform": {
      "version": "0.14.5",
      "resolved": "https://registry.npmjs.org/regenerator-transform/-/regenerator-transform-0.14.5.tgz",
      "integrity": "sha512-eOf6vka5IO151Jfsw2NO9WpGX58W6wWmefK3I1zEGr0lOD0u8rwPaNqQL1aRxUaxLeKO3ArNh3VYg1KbaD+FFw==",
      "dev": true,
      "requires": {
        "@babel/runtime": "^7.8.4"
      }
    },
    "regex-not": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
      "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
      "dev": true,
      "requires": {
        "extend-shallow": "^3.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "regexp.prototype.flags": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.4.1.tgz",
      "integrity": "sha512-pMR7hBVUUGI7PMA37m2ofIdQCsomVnas+Jn5UPGAHQ+/LlwKm/aTLJHdasmHRzlfeZwHiAOaRSo2rbBDm3nNUQ==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.3"
      }
    },
    "regexpu-core": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-5.0.1.tgz",
      "integrity": "sha512-CriEZlrKK9VJw/xQGJpQM5rY88BtuL8DM+AEwvcThHilbxiTAy8vq4iJnd2tqq8wLmjbGZzP7ZcKFjbGkmEFrw==",
      "dev": true,
      "requires": {
        "regenerate": "^1.4.2",
        "regenerate-unicode-properties": "^10.0.1",
        "regjsgen": "^0.6.0",
        "regjsparser": "^0.8.2",
        "unicode-match-property-ecmascript": "^2.0.0",
        "unicode-match-property-value-ecmascript": "^2.0.0"
      }
    },
    "regjsgen": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.6.0.tgz",
      "integrity": "sha512-ozE883Uigtqj3bx7OhL1KNbCzGyW2NQZPl6Hs09WTvCuZD5sTI4JY58bkbQWa/Y9hxIsvJ3M8Nbf7j54IqeZbA==",
      "dev": true
    },
    "regjsparser": {
      "version": "0.8.4",
      "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.8.4.tgz",
      "integrity": "sha512-J3LABycON/VNEu3abOviqGHuB/LOtOQj8SKmfP9anY5GfAVw/SPjwzSjxGjbZXIxbGfqTHtJw58C2Li/WkStmA==",
      "dev": true,
      "requires": {
        "jsesc": "~0.5.0"
      },
      "dependencies": {
        "jsesc": {
          "version": "0.5.0",
          "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
          "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0=",
          "dev": true
        }
      }
    },
    "relateurl": {
      "version": "0.2.7",
      "resolved": "https://registry.npmjs.org/relateurl/-/relateurl-0.2.7.tgz",
      "integrity": "sha512-G08Dxvm4iDN3MLM0EsP62EDV9IuhXPR6blNz6Utcp7zyV3tr4HVNINt6MpaRWbxoOHT3Q7YN2P+jaHX8vUbgog=="
    },
    "remove-accents": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/remove-accents/-/remove-accents-0.4.4.tgz",
      "integrity": "sha512-EpFcOa/ISetVHEXqu+VwI96KZBmq+a8LJnGkaeFw45epGlxIZz5dhEEnNZMsQXgORu3qaMoLX4qJCzOik6ytAg=="
    },
    "remove-trailing-separator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
      "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8=",
      "dev": true,
      "optional": true
    },
    "repeat-element": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.4.tgz",
      "integrity": "sha512-LFiNfRcSu7KK3evMyYOuCzv3L10TW7yC1G2/+StMjK8Y6Vqd2MG7r/Qjw4ghtuCOjFvlnms/iMmLqpvW/ES/WQ==",
      "dev": true
    },
    "repeat-string": {
      "version": "1.6.1",
      "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
      "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc=",
      "dev": true
    },
    "repeating": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/repeating/-/repeating-2.0.1.tgz",
      "integrity": "sha1-UhTFOpJtNVJwdSf7q0FdvAjQbdo=",
      "dev": true,
      "requires": {
        "is-finite": "^1.0.0"
      }
    },
    "request": {
      "version": "2.88.2",
      "resolved": "https://registry.npmjs.org/request/-/request-2.88.2.tgz",
      "integrity": "sha512-MsvtOrfG9ZcrOwAW+Qi+F6HbD0CWXEh9ou77uOb7FM2WPhwT7smM833PzanhJLsgXjN89Ir6V2PczXNnMpwKhw==",
      "requires": {
        "aws-sign2": "~0.7.0",
        "aws4": "^1.8.0",
        "caseless": "~0.12.0",
        "combined-stream": "~1.0.6",
        "extend": "~3.0.2",
        "forever-agent": "~0.6.1",
        "form-data": "~2.3.2",
        "har-validator": "~5.1.3",
        "http-signature": "~1.2.0",
        "is-typedarray": "~1.0.0",
        "isstream": "~0.1.2",
        "json-stringify-safe": "~5.0.1",
        "mime-types": "~2.1.19",
        "oauth-sign": "~0.9.0",
        "performance-now": "^2.1.0",
        "qs": "~6.5.2",
        "safe-buffer": "^5.1.2",
        "tough-cookie": "~2.5.0",
        "tunnel-agent": "^0.6.0",
        "uuid": "^3.3.2"
      },
      "dependencies": {
        "form-data": {
          "version": "2.3.3",
          "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
          "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
          "requires": {
            "asynckit": "^0.4.0",
            "combined-stream": "^1.0.6",
            "mime-types": "^2.1.12"
          }
        },
        "qs": {
          "version": "6.5.3",
          "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.3.tgz",
          "integrity": "sha512-qxXIEh4pCGfHICj1mAJQ2/2XVZkjCDTcEgfoSQxc/fYivUZxTkk7L3bDBJSoNrEzXI17oUO5Dp07ktqE5KzczA=="
        },
        "tough-cookie": {
          "version": "2.5.0",
          "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
          "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
          "requires": {
            "psl": "^1.1.28",
            "punycode": "^2.1.1"
          }
        }
      }
    },
    "request-promise-core": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/request-promise-core/-/request-promise-core-1.1.4.tgz",
      "integrity": "sha512-TTbAfBBRdWD7aNNOoVOBH4pN/KigV6LyapYNNlAPA8JwbovRti1E88m3sYAwsLi5ryhPKsE9APwnjFTgdUjTpw==",
      "requires": {
        "lodash": "^4.17.19"
      }
    },
    "request-promise-native": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/request-promise-native/-/request-promise-native-1.0.9.tgz",
      "integrity": "sha512-wcW+sIUiWnKgNY0dqCpOZkUbF/I+YPi+f09JZIDa39Ec+q82CpSYniDp+ISgTTbKmnpJWASeJBPZmoxH84wt3g==",
      "requires": {
        "request-promise-core": "1.1.4",
        "stealthy-require": "^1.1.1",
        "tough-cookie": "^2.3.3"
      },
      "dependencies": {
        "tough-cookie": {
          "version": "2.5.0",
          "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
          "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
          "requires": {
            "psl": "^1.1.28",
            "punycode": "^2.1.1"
          }
        }
      }
    },
    "require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I=",
      "dev": true
    },
    "require-main-filename": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
      "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg==",
      "dev": true
    },
    "resolve": {
      "version": "1.22.0",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.0.tgz",
      "integrity": "sha512-Hhtrw0nLeSrFQ7phPp4OOcVjLPIeMnRlr5mcnVuMe7M/7eBn98A3hmFRLoFo3DLZkivSYwhRUJTyPyWAk56WLw==",
      "requires": {
        "is-core-module": "^2.8.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      }
    },
    "resolve-cwd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/resolve-cwd/-/resolve-cwd-2.0.0.tgz",
      "integrity": "sha1-AKn3OHVW4nA46uIyyqNypqWbZlo=",
      "dev": true,
      "requires": {
        "resolve-from": "^3.0.0"
      },
      "dependencies": {
        "resolve-from": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
          "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g=",
          "dev": true
        }
      }
    },
    "resolve-dir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/resolve-dir/-/resolve-dir-1.0.1.tgz",
      "integrity": "sha1-eaQGRMNivoLybv/nOcm7U4IEb0M=",
      "dev": true,
      "requires": {
        "expand-tilde": "^2.0.0",
        "global-modules": "^1.0.0"
      },
      "dependencies": {
        "global-modules": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/global-modules/-/global-modules-1.0.0.tgz",
          "integrity": "sha512-sKzpEkf11GpOFuw0Zzjzmt4B4UZwjOcG757PPvrfhxcLFbq0wpsgpOqxpxtxFiCG4DtG93M6XRVbF2oGdev7bg==",
          "dev": true,
          "requires": {
            "global-prefix": "^1.0.1",
            "is-windows": "^1.0.1",
            "resolve-dir": "^1.0.0"
          }
        },
        "global-prefix": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/global-prefix/-/global-prefix-1.0.2.tgz",
          "integrity": "sha1-2/dDxsFJklk8ZVVoy2btMsASLr4=",
          "dev": true,
          "requires": {
            "expand-tilde": "^2.0.2",
            "homedir-polyfill": "^1.0.1",
            "ini": "^1.3.4",
            "is-windows": "^1.0.1",
            "which": "^1.2.14"
          }
        }
      }
    },
    "resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g=="
    },
    "resolve-pathname": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pathname/-/resolve-pathname-3.0.0.tgz",
      "integrity": "sha512-C7rARubxI8bXFNB/hqcp/4iUeIXJhJZvFPFPiSPRnhU5UPxzMFIl+2E6yY6c4k9giDJAhtV+enfA+G89N6Csng=="
    },
    "resolve-url": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
      "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo=",
      "dev": true
    },
    "ret": {
      "version": "0.1.15",
      "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
      "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg==",
      "dev": true
    },
    "retry-request": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/retry-request/-/retry-request-4.2.2.tgz",
      "integrity": "sha512-xA93uxUD/rogV7BV59agW/JHPGXeREMWiZc9jhcwY4YdZ7QOtC7qbomYg0n4wyk2lJhggjvKvhNX8wln/Aldhg==",
      "requires": {
        "debug": "^4.1.1",
        "extend": "^3.0.2"
      }
    },
    "rifm": {
      "version": "0.12.1",
      "resolved": "https://registry.npmjs.org/rifm/-/rifm-0.12.1.tgz",
      "integrity": "sha512-OGA1Bitg/dSJtI/c4dh90svzaUPt228kzFsUkJbtA2c964IqEAwWXeL9ZJi86xWv3j5SMqRvGULl7bA6cK0Bvg=="
    },
    "rimraf": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
      "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
      "requires": {
        "glob": "^7.1.3"
      }
    },
    "ripemd160": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
      "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
      "dev": true,
      "requires": {
        "hash-base": "^3.0.0",
        "inherits": "^2.0.1"
      }
    },
    "run-queue": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
      "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1"
      },
      "dependencies": {
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
          "dev": true
        }
      }
    },
    "safe-array-concat": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.0.0.tgz",
      "integrity": "sha512-9dVEFruWIsnie89yym+xWTAYASdpw3CJV7Li/6zBewGf9z2i1j31rP6jnY0pHEO4QZh6N0K11bFjWmdR8UGdPQ==",
      "requires": {
        "call-bind": "^1.0.2",
        "get-intrinsic": "^1.2.0",
        "has-symbols": "^1.0.3",
        "isarray": "^2.0.5"
      },
      "dependencies": {
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        },
        "isarray": {
          "version": "2.0.5",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
          "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw=="
        }
      }
    },
    "safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
    },
    "safe-regex": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
      "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
      "dev": true,
      "requires": {
        "ret": "~0.1.10"
      }
    },
    "safe-regex-test": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.0.0.tgz",
      "integrity": "sha512-JBUUzyOgEwXQY1NuPtvcj/qcBDbDmEvWufhlnXZIm75DEHp+afM1r1ujJpJsV/gSM4t59tpDyPi1sd6ZaPFfsA==",
      "requires": {
        "call-bind": "^1.0.2",
        "get-intrinsic": "^1.1.3",
        "is-regex": "^1.1.4"
      },
      "dependencies": {
        "get-intrinsic": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.0.tgz",
          "integrity": "sha512-L049y6nFOuom5wGyRc3/gdTLO94dySVKRACj1RmJZBQXlbTMhtNIgkWkUHq+jYmZvKf14EW1EoJnnjbmoHij0Q==",
          "requires": {
            "function-bind": "^1.1.1",
            "has": "^1.0.3",
            "has-symbols": "^1.0.3"
          }
        },
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        }
      }
    },
    "safe-stable-stringify": {
      "version": "2.4.3",
      "resolved": "https://registry.npmjs.org/safe-stable-stringify/-/safe-stable-stringify-2.4.3.tgz",
      "integrity": "sha512-e2bDA2WJT0wxseVd4lsDP4+3ONX6HpMXQa1ZhFQ7SU+GjvORCmShbCMltrtIDfkYhVHrOcPtj+KhmDBdPdZD1g=="
    },
    "safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
    },
    "sass-graph": {
      "version": "2.2.5",
      "resolved": "https://registry.npmjs.org/sass-graph/-/sass-graph-2.2.5.tgz",
      "integrity": "sha512-VFWDAHOe6mRuT4mZRd4eKE+d8Uedrk6Xnh7Sh9b4NGufQLQjOrvf/MQoOdx+0s92L89FeyUUNfU597j/3uNpag==",
      "dev": true,
      "requires": {
        "glob": "^7.0.0",
        "lodash": "^4.0.0",
        "scss-tokenizer": "^0.2.3",
        "yargs": "^13.3.2"
      }
    },
    "sass-loader": {
      "version": "7.3.1",
      "resolved": "https://registry.npmjs.org/sass-loader/-/sass-loader-7.3.1.tgz",
      "integrity": "sha512-tuU7+zm0pTCynKYHpdqaPpe+MMTQ76I9TPZ7i4/5dZsigE350shQWe5EZNl5dBidM49TPET75tNqRbcsUZWeNA==",
      "dev": true,
      "requires": {
        "clone-deep": "^4.0.1",
        "loader-utils": "^1.0.1",
        "neo-async": "^2.5.0",
        "pify": "^4.0.1",
        "semver": "^6.3.0"
      }
    },
    "sax": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.1.tgz",
      "integrity": "sha512-8I2a3LovHTOpm7NV5yOyO8IHqgVsfK4+UuySrXU8YXkSRX7k6hCV9b3HrkKCr3nMpgj+0bmocaJJWpvp1oc7ZA=="
    },
    "saxes": {
      "version": "3.1.11",
      "resolved": "https://registry.npmjs.org/saxes/-/saxes-3.1.11.tgz",
      "integrity": "sha512-Ydydq3zC+WYDJK1+gRxRapLIED9PWeSuuS41wqyoRmzvhhh9nc+QQrVMKJYzJFULazeGhzSV0QleN2wD3boh2g==",
      "requires": {
        "xmlchars": "^2.1.1"
      }
    },
    "schema-utils": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-2.7.1.tgz",
      "integrity": "sha512-SHiNtMOUGWBQJwzISiVYKu82GiV4QYGePp3odlY1tuKO7gPtphAT5R/py0fA6xtbgLL/RvtJZnU9b8s0F1q0Xg==",
      "dev": true,
      "requires": {
        "@types/json-schema": "^7.0.5",
        "ajv": "^6.12.4",
        "ajv-keywords": "^3.5.2"
      }
    },
    "scroll-into-view-if-needed": {
      "version": "2.2.31",
      "resolved": "https://registry.npmjs.org/scroll-into-view-if-needed/-/scroll-into-view-if-needed-2.2.31.tgz",
      "integrity": "sha512-dGCXy99wZQivjmjIqihaBQNjryrz5rueJY7eHfTdyWEiR4ttYpsajb14rn9s5d4DY4EcY6+4+U/maARBXJedkA==",
      "requires": {
        "compute-scroll-into-view": "^1.0.20"
      }
    },
    "scss-tokenizer": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/scss-tokenizer/-/scss-tokenizer-0.2.3.tgz",
      "integrity": "sha1-jrBtualyMzOCTT9VMGQRSYR85dE=",
      "dev": true,
      "requires": {
        "js-base64": "^2.1.8",
        "source-map": "^0.4.2"
      },
      "dependencies": {
        "source-map": {
          "version": "0.4.4",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz",
          "integrity": "sha1-66T12pwNyZneaAMti092FzZSA2s=",
          "dev": true,
          "requires": {
            "amdefine": ">=0.0.4"
          }
        }
      }
    },
    "section-iterator": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/section-iterator/-/section-iterator-2.0.0.tgz",
      "integrity": "sha512-xvTNwcbeDayXotnV32zLb3duQsP+4XosHpb/F+tu6VzEZFmIjzPdNk6/O+QOOx5XTh08KL2ufdXeCO33p380pQ=="
    },
    "secure-json-parse": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/secure-json-parse/-/secure-json-parse-2.7.0.tgz",
      "integrity": "sha512-6aU+Rwsezw7VR8/nyvKTx8QpWH9FrcYiXXlqC4z5d5XQBDRqtbfsRjnwGyqbi3gddNtWHuEk9OANUotL26qKUw=="
    },
    "semver": {
      "version": "6.3.0",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
      "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
    },
    "send": {
      "version": "0.17.2",
      "resolved": "https://registry.npmjs.org/send/-/send-0.17.2.tgz",
      "integrity": "sha512-UJYB6wFSJE3G00nEivR5rgWp8c2xXvJ3OPWPhmuteU0IKj8nKbG3DrjiOmLwpnHGYWAVwA69zmTm++YG0Hmwww==",
      "requires": {
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "destroy": "~1.0.4",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "0.5.2",
        "http-errors": "1.8.1",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "~2.3.0",
        "range-parser": "~1.2.1",
        "statuses": "~1.5.0"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "requires": {
            "ms": "2.0.0"
          },
          "dependencies": {
            "ms": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
              "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
            }
          }
        },
        "mime": {
          "version": "1.6.0",
          "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
          "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg=="
        },
        "ms": {
          "version": "2.1.3",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
          "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="
        }
      }
    },
    "serialize-javascript": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-4.0.0.tgz",
      "integrity": "sha512-GaNA54380uFefWghODBWEGisLZFj00nS5ACs6yHa9nLqlLpVLO8ChDGeKRjZnV4Nh4n0Qi7nhYZD/9fCPzEqkw==",
      "dev": true,
      "requires": {
        "randombytes": "^2.1.0"
      }
    },
    "serve-static": {
      "version": "1.14.2",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.14.2.tgz",
      "integrity": "sha512-+TMNA9AFxUEGuC0z2mevogSnn9MXKb4fa7ngeRMJaaGv8vTwnIEkKi+QGvPt33HSnf8pRS+WGM0EbMtCJLKMBQ==",
      "requires": {
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "0.17.2"
      }
    },
    "set-blocking": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
      "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc="
    },
    "set-value": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.1.tgz",
      "integrity": "sha512-JxHc1weCN68wRY0fhCoXpyK55m/XPHafOmK4UWD7m2CI14GMcFypt4w/0+NV5f/ZMby2F6S2wwA7fgynh9gWSw==",
      "dev": true,
      "requires": {
        "extend-shallow": "^2.0.1",
        "is-extendable": "^0.1.1",
        "is-plain-object": "^2.0.3",
        "split-string": "^3.0.1"
      },
      "dependencies": {
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        }
      }
    },
    "setimmediate": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
      "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU=",
      "dev": true
    },
    "setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw=="
    },
    "sha.js": {
      "version": "2.4.11",
      "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
      "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "shallow-clone": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-3.0.1.tgz",
      "integrity": "sha512-/6KqX+GVUdqPuPPd2LxDDxzX6CAbjJehAAOKlNpqqUpAqPM6HeL8f+o3a+JsyGjn2lv0WY8UsTgUJjU9Ok55NA==",
      "dev": true,
      "requires": {
        "kind-of": "^6.0.2"
      }
    },
    "shallow-equal": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/shallow-equal/-/shallow-equal-1.2.1.tgz",
      "integrity": "sha512-S4vJDjHHMBaiZuT9NPb616CSmLf618jawtv3sufLl6ivK8WocjAo58cXwbRV1cgqxH0Qbv+iUt6m05eqEa2IRA=="
    },
    "sharp": {
      "version": "0.23.4",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.23.4.tgz",
      "integrity": "sha512-fJMagt6cT0UDy9XCsgyLi0eiwWWhQRxbwGmqQT6sY8Av4s0SVsT/deg8fobBQCTDU5iXRgz0rAeXoE2LBZ8g+Q==",
      "requires": {
        "color": "^3.1.2",
        "detect-libc": "^1.0.3",
        "nan": "^2.14.0",
        "npmlog": "^4.1.2",
        "prebuild-install": "^5.3.3",
        "semver": "^6.3.0",
        "simple-get": "^3.1.0",
        "tar": "^5.0.5",
        "tunnel-agent": "^0.6.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
          "integrity": "sha512-TIGnTpdo+E3+pCyAluZvtED5p5wCqLdezCyhPZzKPcxvFplEt4i+W7OONCKgeZFT3+y5NZZfOOS/Bdcanm1MYA=="
        },
        "aproba": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
          "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw=="
        },
        "are-we-there-yet": {
          "version": "1.1.7",
          "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-1.1.7.tgz",
          "integrity": "sha512-nxwy40TuMiUGqMyRHgCSWZ9FM4VAoRP4xUYSTv5ImRog+h9yISPbVH7H8fASCIzYn9wlEv4zvFL7uKDMCFQm3g==",
          "requires": {
            "delegates": "^1.0.0",
            "readable-stream": "^2.0.6"
          }
        },
        "chownr": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
          "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg=="
        },
        "detect-libc": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-1.0.3.tgz",
          "integrity": "sha512-pGjwhsmsp4kL2RTz08wcOlGN83otlqHeD/Z5T8GXZB+/YcpQ/dgo+lbU8ZsGxV0HIvqqxo9l7mqYwyYMD9bKDg=="
        },
        "gauge": {
          "version": "2.7.4",
          "resolved": "https://registry.npmjs.org/gauge/-/gauge-2.7.4.tgz",
          "integrity": "sha512-14x4kjc6lkD3ltw589k0NrPD6cCNTD6CWoVUNpB85+DrtONoZn+Rug6xZU5RvSC4+TZPxA5AnBibQYAvZn41Hg==",
          "requires": {
            "aproba": "^1.0.3",
            "console-control-strings": "^1.0.0",
            "has-unicode": "^2.0.0",
            "object-assign": "^4.1.0",
            "signal-exit": "^3.0.0",
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1",
            "wide-align": "^1.1.0"
          }
        },
        "is-fullwidth-code-point": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
          "integrity": "sha512-1pqUqRjkhPJ9miNq9SwMfdvi6lBJcd6eFxvfaivQhaH3SgisfiuudvFntdKOmxuee/77l+FPjKrQjWvmPjWrRw==",
          "requires": {
            "number-is-nan": "^1.0.0"
          }
        },
        "minipass": {
          "version": "3.3.6",
          "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.3.6.tgz",
          "integrity": "sha512-DxiNidxSEK+tHG6zOIklvNOwm3hvCrbUrdtzY74U6HKTJxvIDfOUL5W5P2Ghd3DTkhhKPYGqeNUIh5qcM4YBfw==",
          "requires": {
            "yallist": "^4.0.0"
          }
        },
        "npmlog": {
          "version": "4.1.2",
          "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-4.1.2.tgz",
          "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
          "requires": {
            "are-we-there-yet": "~1.1.2",
            "console-control-strings": "~1.1.0",
            "gauge": "~2.7.3",
            "set-blocking": "~2.0.0"
          }
        },
        "readable-stream": {
          "version": "2.3.8",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.8.tgz",
          "integrity": "sha512-8p0AUk4XODgIewSi0l8Epjs+EVnWiK7NoDIEGU0HhE7+ZyY8D1IMY7odu5lRrFXGg71L15KG8QrPmum45RTtdA==",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string-width": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
          "integrity": "sha512-0XsVpQLnVCXHJfyEs8tC0zpTVIr5PKKsQtkT29IwupnPTjtPmQ3xT/4yCREF9hYkV/3M3kzcUTSAZT6a6h81tw==",
          "requires": {
            "code-point-at": "^1.0.0",
            "is-fullwidth-code-point": "^1.0.0",
            "strip-ansi": "^3.0.0"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        },
        "strip-ansi": {
          "version": "3.0.1",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
          "integrity": "sha512-VhumSSbBqDTP8p2ZLKj40UjBCV4+v8bUSEpUb4KjRgWk9pbqGF4REFj6KEagidb2f/M6AzC0EmFyDNGaw9OCzg==",
          "requires": {
            "ansi-regex": "^2.0.0"
          }
        },
        "tar": {
          "version": "5.0.11",
          "resolved": "https://registry.npmjs.org/tar/-/tar-5.0.11.tgz",
          "integrity": "sha512-E6q48d5y4XSCD+Xmwc0yc8lXuyDK38E0FB8N4S/drQRtXOMUhfhDxbB0xr2KKDhNfO51CFmoa6Oz00nAkWsjnA==",
          "requires": {
            "chownr": "^1.1.4",
            "fs-minipass": "^2.1.0",
            "minipass": "^3.1.3",
            "minizlib": "^2.1.2",
            "mkdirp": "^0.5.5",
            "yallist": "^4.0.0"
          }
        },
        "yallist": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
          "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
        }
      }
    },
    "shebang-command": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-1.2.0.tgz",
      "integrity": "sha1-RKrGW2lbAzmJaMOfNj/uXer98eo=",
      "dev": true,
      "requires": {
        "shebang-regex": "^1.0.0"
      }
    },
    "shebang-regex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-1.0.0.tgz",
      "integrity": "sha1-2kL0l0DAtC2yypcoVxyxkMmO/qM=",
      "dev": true
    },
    "side-channel": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.0.4.tgz",
      "integrity": "sha512-q5XPytqFEIKHkGdiMIrY10mvLRvnQh42/+GoBlFW3b2LXLE2xxJpZFdm94we0BaoV3RwJyGqg5wS7epxTv0Zvw==",
      "requires": {
        "call-bind": "^1.0.0",
        "get-intrinsic": "^1.0.2",
        "object-inspect": "^1.9.0"
      }
    },
    "sigmund": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/sigmund/-/sigmund-1.0.1.tgz",
      "integrity": "sha512-fCvEXfh6NWpm+YSuY2bpXb/VIihqWA6hLsgboC+0nl71Q7N7o2eaCW8mJa/NLvQhs6jpd3VZV4UiUQlV6+lc8g=="
    },
    "signal-exit": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ=="
    },
    "simple-concat": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/simple-concat/-/simple-concat-1.0.1.tgz",
      "integrity": "sha512-cSFtAPtRhljv69IK0hTVZQ+OfE9nePi/rtJmw5UjHeVyVroEqJXP1sFztKUy1qU+xvz3u/sfYJLa947b7nAN2Q=="
    },
    "simple-get": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/simple-get/-/simple-get-3.1.1.tgz",
      "integrity": "sha512-CQ5LTKGfCpvE1K0n2us+kuMPbk/q0EKl82s4aheV9oXjFEz6W/Y7oQFVJuU6QG77hRT4Ghb5RURteF5vnWjupA==",
      "requires": {
        "decompress-response": "^4.2.0",
        "once": "^1.3.1",
        "simple-concat": "^1.0.0"
      }
    },
    "simple-swizzle": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/simple-swizzle/-/simple-swizzle-0.2.2.tgz",
      "integrity": "sha512-JA//kQgZtbuY83m+xT+tXJkmJncGMTFT+C+g2h2R9uxkYIrE2yy9sgmcLhCnw57/WSD+Eh3J97FPEDFnbXnDUg==",
      "requires": {
        "is-arrayish": "^0.3.1"
      },
      "dependencies": {
        "is-arrayish": {
          "version": "0.3.2",
          "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.3.2.tgz",
          "integrity": "sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ=="
        }
      }
    },
    "slash": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
      "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU=",
      "dev": true
    },
    "slate": {
      "version": "0.90.0",
      "resolved": "https://registry.npmjs.org/slate/-/slate-0.90.0.tgz",
      "integrity": "sha512-dv8idv0JjYyHiAJcVKf5yWKPDMTDi+PSZyfjsnquEI8VB5nmTVGjeJab06lc3o69O7aN05ROwO9/OY8mU1IUPA==",
      "requires": {
        "immer": "^9.0.6",
        "is-plain-object": "^5.0.0",
        "tiny-warning": "^1.0.3"
      },
      "dependencies": {
        "is-plain-object": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-5.0.0.tgz",
          "integrity": "sha512-VRSzKkbMm5jMDoKLbltAkFQ5Qr7VDiTFGXxYFXXowVj387GeGNOCsOH6Msy00SGZ3Fp84b1Naa1psqgcCIEP5Q=="
        }
      }
    },
    "slate-history": {
      "version": "0.86.0",
      "resolved": "https://registry.npmjs.org/slate-history/-/slate-history-0.86.0.tgz",
      "integrity": "sha512-OxObL9tbhgwvSlnKSCpGIh7wnuaqvOj5jRExGjEyCU2Ke8ctf22HjT+jw7GEi9ttLzNTUmTEU3YIzqKGeqN+og==",
      "requires": {
        "is-plain-object": "^5.0.0"
      },
      "dependencies": {
        "is-plain-object": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-5.0.0.tgz",
          "integrity": "sha512-VRSzKkbMm5jMDoKLbltAkFQ5Qr7VDiTFGXxYFXXowVj387GeGNOCsOH6Msy00SGZ3Fp84b1Naa1psqgcCIEP5Q=="
        }
      }
    },
    "slate-react": {
      "version": "0.90.0",
      "resolved": "https://registry.npmjs.org/slate-react/-/slate-react-0.90.0.tgz",
      "integrity": "sha512-z6pGd6jjU5VazLxlDi6zL3a6yaPBPJ+A2VyIlE/h/rvDywaLYGvk0xcrA9NrK71Dr47HK5ZN2zFEZNleh6wlPA==",
      "requires": {
        "@juggle/resize-observer": "^3.4.0",
        "@types/is-hotkey": "^0.1.1",
        "@types/lodash": "^4.14.149",
        "direction": "^1.0.3",
        "is-hotkey": "^0.1.6",
        "is-plain-object": "^5.0.0",
        "lodash": "^4.17.4",
        "scroll-into-view-if-needed": "^2.2.20",
        "tiny-invariant": "1.0.6"
      },
      "dependencies": {
        "is-plain-object": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-5.0.0.tgz",
          "integrity": "sha512-VRSzKkbMm5jMDoKLbltAkFQ5Qr7VDiTFGXxYFXXowVj387GeGNOCsOH6Msy00SGZ3Fp84b1Naa1psqgcCIEP5Q=="
        }
      }
    },
    "snakeize": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/snakeize/-/snakeize-0.1.0.tgz",
      "integrity": "sha512-ot3bb6pQt6IVq5G/JQ640ceSYTPtriVrwNyfoUw1LmQQGzPMAGxE5F+ded2UwSUCyf2PW1fFAYUnVEX21PWbpQ=="
    },
    "snapdragon": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
      "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
      "dev": true,
      "requires": {
        "base": "^0.11.1",
        "debug": "^2.2.0",
        "define-property": "^0.2.5",
        "extend-shallow": "^2.0.1",
        "map-cache": "^0.2.2",
        "source-map": "^0.5.6",
        "source-map-resolve": "^0.5.0",
        "use": "^3.1.0"
      },
      "dependencies": {
        "debug": {
          "version": "2.6.9",
          "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
          "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
          "dev": true,
          "requires": {
            "ms": "2.0.0"
          }
        },
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "extend-shallow": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
          "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
          "dev": true,
          "requires": {
            "is-extendable": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^0.1.6",
            "is-data-descriptor": "^0.1.4",
            "kind-of": "^5.0.0"
          }
        },
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g=",
          "dev": true
        }
      }
    },
    "snapdragon-node": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
      "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
      "dev": true,
      "requires": {
        "define-property": "^1.0.0",
        "isobject": "^3.0.0",
        "snapdragon-util": "^3.0.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        }
      }
    },
    "snapdragon-util": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
      "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
      "dev": true,
      "requires": {
        "kind-of": "^3.2.0"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "socket.io": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/socket.io/-/socket.io-2.5.0.tgz",
      "integrity": "sha512-gGunfS0od3VpwDBpGwVkzSZx6Aqo9uOcf1afJj2cKnKFAoyl16fvhpsUhmUFd4Ldbvl5JvRQed6eQw6oQp6n8w==",
      "requires": {
        "debug": "~4.1.0",
        "engine.io": "~3.6.0",
        "has-binary2": "~1.0.2",
        "socket.io-adapter": "~1.1.0",
        "socket.io-client": "2.5.0",
        "socket.io-parser": "~3.4.0"
      },
      "dependencies": {
        "component-emitter": {
          "version": "1.2.1",
          "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.2.1.tgz",
          "integrity": "sha512-jPatnhd33viNplKjqXKRkGU345p263OIWzDL2wH3LGIGp5Kojo+uXizHmOADRvhGFFTnJqX3jBAKP6vvmSDKcA=="
        },
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "isarray": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.1.tgz",
          "integrity": "sha512-c2cu3UxbI+b6kR3fy0nRnAhodsvR9dx7U5+znCOzdj6IfP3upFURTr0Xl5BlQZNKZjEtxrmVyfSdeE3O57smoQ=="
        },
        "socket.io-parser": {
          "version": "3.4.2",
          "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-3.4.2.tgz",
          "integrity": "sha512-QFZBaZDNqZXeemwejc7D39jrq2eGK/qZuVDiMPKzZK1hLlNvjGilGt4ckfQZeVX4dGmuPzCytN9ZW1nQlEWjgA==",
          "requires": {
            "component-emitter": "1.2.1",
            "debug": "~4.1.0",
            "isarray": "2.0.1"
          }
        }
      }
    },
    "socket.io-adapter": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/socket.io-adapter/-/socket.io-adapter-1.1.2.tgz",
      "integrity": "sha512-WzZRUj1kUjrTIrUKpZLEzFZ1OLj5FwLlAFQs9kuZJzJi5DKdU7FsWc36SNmA8iDOtwBQyT8FkrriRM8vXLYz8g=="
    },
    "socket.io-client": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/socket.io-client/-/socket.io-client-2.5.0.tgz",
      "integrity": "sha512-lOO9clmdgssDykiOmVQQitwBAF3I6mYcQAo7hQ7AM6Ny5X7fp8hIJ3HcQs3Rjz4SoggoxA1OgrQyY8EgTbcPYw==",
      "requires": {
        "backo2": "1.0.2",
        "component-bind": "1.0.0",
        "component-emitter": "~1.3.0",
        "debug": "~3.1.0",
        "engine.io-client": "~3.5.0",
        "has-binary2": "~1.0.2",
        "indexof": "0.0.1",
        "parseqs": "0.0.6",
        "parseuri": "0.0.6",
        "socket.io-parser": "~3.3.0",
        "to-array": "0.1.4"
      },
      "dependencies": {
        "debug": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
          "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
          "requires": {
            "ms": "2.0.0"
          }
        },
        "isarray": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.1.tgz",
          "integrity": "sha512-c2cu3UxbI+b6kR3fy0nRnAhodsvR9dx7U5+znCOzdj6IfP3upFURTr0Xl5BlQZNKZjEtxrmVyfSdeE3O57smoQ=="
        },
        "ms": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
          "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A=="
        },
        "socket.io-parser": {
          "version": "3.3.3",
          "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-3.3.3.tgz",
          "integrity": "sha512-qOg87q1PMWWTeO01768Yh9ogn7chB9zkKtQnya41Y355S0UmpXgpcrFwAgjYJxu9BdKug5r5e9YtVSeWhKBUZg==",
          "requires": {
            "component-emitter": "~1.3.0",
            "debug": "~3.1.0",
            "isarray": "2.0.1"
          }
        }
      }
    },
    "socket.io-parser": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/socket.io-parser/-/socket.io-parser-4.2.2.tgz",
      "integrity": "sha512-DJtziuKypFkMMHCm2uIshOYC7QaylbtzQwiMYDuCKy3OPkjLzu4B2vAhTlqipRHHzrI0NJeBAizTK7X+6m1jVw==",
      "requires": {
        "@socket.io/component-emitter": "~3.1.0",
        "debug": "~4.3.1"
      }
    },
    "source-list-map": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.1.tgz",
      "integrity": "sha512-qnQ7gVMxGNxsiL4lEuJwe/To8UnK7fAnmbGEEH8RpLouuKbeEm0lhbQVFIrNSuB+G7tVrAlVsZgETT5nljf+Iw==",
      "dev": true
    },
    "source-map": {
      "version": "0.5.7",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
      "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
    },
    "source-map-loader": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/source-map-loader/-/source-map-loader-0.2.4.tgz",
      "integrity": "sha512-OU6UJUty+i2JDpTItnizPrlpOIBLmQbWMuBg9q5bVtnHACqw1tn9nNwqJLbv0/00JjnJb/Ee5g5WS5vrRv7zIQ==",
      "dev": true,
      "requires": {
        "async": "^2.5.0",
        "loader-utils": "^1.1.0"
      }
    },
    "source-map-resolve": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.3.tgz",
      "integrity": "sha512-Htz+RnsXWk5+P2slx5Jh3Q66vhQj1Cllm0zvnaY98+NFx+Dv2CF/f5O/t8x+KaNdrdIAsruNzoh/KpialbqAnw==",
      "dev": true,
      "requires": {
        "atob": "^2.1.2",
        "decode-uri-component": "^0.2.0",
        "resolve-url": "^0.2.1",
        "source-map-url": "^0.4.0",
        "urix": "^0.1.0"
      }
    },
    "source-map-support": {
      "version": "0.5.21",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.21.tgz",
      "integrity": "sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==",
      "requires": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      },
      "dependencies": {
        "buffer-from": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
          "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ=="
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
        }
      }
    },
    "source-map-url": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.1.tgz",
      "integrity": "sha512-cPiFOTLUKvJFIg4SKVScy4ilPPW6rFgMgfuZJPNoDuMs3nC1HbMUycBoJw77xFIp6z1UJQJOfx6C9GMH80DiTw==",
      "dev": true
    },
    "spdx-correct": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.1.1.tgz",
      "integrity": "sha512-cOYcUWwhCuHCXi49RhFRCyJEK3iPj1Ziz9DpViV3tbZOwXD49QzIN3MpOLJNxh2qwq2lJJZaKMVw9qNi4jTC0w==",
      "dev": true,
      "requires": {
        "spdx-expression-parse": "^3.0.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "spdx-exceptions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.3.0.tgz",
      "integrity": "sha512-/tTrYOC7PPI1nUAgx34hUpqXuyJG+DTHJTnIULG4rDygi4xu/tfgmq1e1cIRwRzwZgo4NLySi+ricLkZkw4i5A==",
      "dev": true
    },
    "spdx-expression-parse": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.1.tgz",
      "integrity": "sha512-cbqHunsQWnJNE6KhVSMsMeH5H/L9EpymbzqTQ3uLwNCLZ1Q481oWaofqH7nO6V07xlXwY6PhQdQ2IedWx/ZK4Q==",
      "dev": true,
      "requires": {
        "spdx-exceptions": "^2.1.0",
        "spdx-license-ids": "^3.0.0"
      }
    },
    "spdx-license-ids": {
      "version": "3.0.11",
      "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.11.tgz",
      "integrity": "sha512-Ctl2BrFiM0X3MANYgj3CkygxhRmr9mi6xhejbdO960nF6EDJApTYpn0BQnDKlnNBULKiCN1n3w9EBkHK8ZWg+g==",
      "dev": true
    },
    "split-array-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/split-array-stream/-/split-array-stream-2.0.0.tgz",
      "integrity": "sha512-hmMswlVY91WvGMxs0k8MRgq8zb2mSen4FmDNc5AFiTWtrBpdZN6nwD6kROVe4vNL+ywrvbCKsWVCnEd4riELIg==",
      "requires": {
        "is-stream-ended": "^0.1.4"
      }
    },
    "split-string": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
      "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
      "dev": true,
      "requires": {
        "extend-shallow": "^3.0.0"
      }
    },
    "split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg=="
    },
    "sprintf-js": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
      "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw="
    },
    "sshpk": {
      "version": "1.17.0",
      "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.17.0.tgz",
      "integrity": "sha512-/9HIEs1ZXGhSPE8X6Ccm7Nam1z8KcoCqPdI7ecm1N33EzAetWahvQWVqLZtaZQ+IDKX4IyA2o0gBzqIMkAagHQ==",
      "requires": {
        "asn1": "~0.2.3",
        "assert-plus": "^1.0.0",
        "bcrypt-pbkdf": "^1.0.0",
        "dashdash": "^1.12.0",
        "ecc-jsbn": "~0.1.1",
        "getpass": "^0.1.1",
        "jsbn": "~0.1.0",
        "safer-buffer": "^2.0.2",
        "tweetnacl": "~0.14.0"
      }
    },
    "ssri": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.2.tgz",
      "integrity": "sha512-cepbSq/neFK7xB6A50KHN0xHDotYzq58wWCa5LeWqnPrHG8GzfEjO/4O8kpmcGW+oaxkvhEJCWgbgNk4/ZV93Q==",
      "dev": true,
      "requires": {
        "figgy-pudding": "^3.5.1"
      }
    },
    "stable": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/stable/-/stable-0.1.8.tgz",
      "integrity": "sha512-ji9qxRnOVfcuLDySj9qzhGSEFVobyt1kIOSkj1qZzYLzq7Tos/oUUWvotUPQLlrsidqsK6tBH89Bc9kL5zHA6w=="
    },
    "stack-trace": {
      "version": "0.0.10",
      "resolved": "https://registry.npmjs.org/stack-trace/-/stack-trace-0.0.10.tgz",
      "integrity": "sha512-KGzahc7puUKkzyMt+IqAep+TVNbKP+k2Lmwhub39m1AsTSkaDutx56aDCo+HLDzf/D26BIHTJWNiTG1KAJiQCg=="
    },
    "static-extend": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
      "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
      "dev": true,
      "requires": {
        "define-property": "^0.2.5",
        "object-copy": "^0.1.0"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
          "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-data-descriptor": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
          "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
          "dev": true,
          "requires": {
            "kind-of": "^3.0.2"
          },
          "dependencies": {
            "kind-of": {
              "version": "3.2.2",
              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
              "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
              "dev": true,
              "requires": {
                "is-buffer": "^1.1.5"
              }
            }
          }
        },
        "is-descriptor": {
          "version": "0.1.6",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
          "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^0.1.6",
            "is-data-descriptor": "^0.1.4",
            "kind-of": "^5.0.0"
          }
        },
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "statuses": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
      "integrity": "sha1-Fhx9rBd2Wf2YEfQ3cfqZOBR4Yow="
    },
    "stdout-stream": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/stdout-stream/-/stdout-stream-1.4.1.tgz",
      "integrity": "sha512-j4emi03KXqJWcIeF8eIXkjMFN1Cmb8gUlDYGeBALLPo5qdyTfA9bOtl8m33lRoC+vFMkP3gl0WsDr6+gzxbbTA==",
      "dev": true,
      "requires": {
        "readable-stream": "^2.0.1"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "stealthy-require": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/stealthy-require/-/stealthy-require-1.1.1.tgz",
      "integrity": "sha512-ZnWpYnYugiOVEY5GkcuJK1io5V8QmNYChG62gSit9pQVGErXtrKuPC55ITaVSukmMta5qpMU7vqLt2Lnni4f/g=="
    },
    "stream-browserify": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.2.tgz",
      "integrity": "sha512-nX6hmklHs/gr2FuxYDltq8fJA1GDlxKQCz8O/IM4atRqBH8OORmBNgfvW5gG10GT/qQ9u0CzIvr2X5Pkt6ntqg==",
      "dev": true,
      "requires": {
        "inherits": "~2.0.1",
        "readable-stream": "^2.0.2"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "stream-each": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.3.tgz",
      "integrity": "sha512-vlMC2f8I2u/bZGqkdfLQW/13Zihpej/7PmSiMQsbYddxuTsJp8vRe2x2FvVExZg7FaOds43ROAuFJwPR4MTZLw==",
      "dev": true,
      "requires": {
        "end-of-stream": "^1.1.0",
        "stream-shift": "^1.0.0"
      }
    },
    "stream-events": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/stream-events/-/stream-events-1.0.5.tgz",
      "integrity": "sha512-E1GUzBSgvct8Jsb3v2X15pjzN1tYebtbLaMg+eBOUOAxgbLoSbT2NS91ckc5lJD1KfLjId+jXJRgo0qnV5Nerg==",
      "requires": {
        "stubs": "^3.0.0"
      }
    },
    "stream-http": {
      "version": "2.8.3",
      "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
      "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
      "dev": true,
      "requires": {
        "builtin-status-codes": "^3.0.0",
        "inherits": "^2.0.1",
        "readable-stream": "^2.3.6",
        "to-arraybuffer": "^1.0.0",
        "xtend": "^4.0.0"
      },
      "dependencies": {
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "stream-shift": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.1.tgz",
      "integrity": "sha512-AiisoFqQ0vbGcZgQPY1cdP2I76glaVA/RauYR4G4thNFgkTqr90yXTo4LYX60Jl+sIlPNHHdGSwo01AvbKUSVQ=="
    },
    "streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg=="
    },
    "string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "requires": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      }
    },
    "string.prototype.trim": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/string.prototype.trim/-/string.prototype.trim-1.2.7.tgz",
      "integrity": "sha512-p6TmeT1T3411M8Cgg9wBTMRtY2q9+PNy9EV1i2lIXUN/btt763oIfxwN3RR8VU6wHX8j/1CFy0L+YuThm6bgOg==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.4",
        "es-abstract": "^1.20.4"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        }
      }
    },
    "string.prototype.trimend": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.6.tgz",
      "integrity": "sha512-JySq+4mrPf9EsDBEDYMOb/lM7XQLulwg5R/m1r0PXEFqrV0qHvl58sdTilSXtKOflCsK2E8jxf+GKC0T07RWwQ==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.4",
        "es-abstract": "^1.20.4"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        }
      }
    },
    "string.prototype.trimstart": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.6.tgz",
      "integrity": "sha512-omqjMDaY92pbn5HOX7f9IccLA+U1tA9GvtU4JrodiXFfYB7jPzzHpRzpglLAjtUV6bB557zwClJezTqnAiYnQA==",
      "requires": {
        "call-bind": "^1.0.2",
        "define-properties": "^1.1.4",
        "es-abstract": "^1.20.4"
      },
      "dependencies": {
        "define-properties": {
          "version": "1.2.0",
          "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.0.tgz",
          "integrity": "sha512-xvqAVKGfT1+UAvPwKTVw/njhdQ8ZhXK4lI0bCIuCMrp2up9nPnaDftrLtmpTazqd1o+UY4zgzU+avtMbDP+ldA==",
          "requires": {
            "has-property-descriptors": "^1.0.0",
            "object-keys": "^1.1.1"
          }
        }
      }
    },
    "string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "requires": {
        "safe-buffer": "~5.2.0"
      },
      "dependencies": {
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="
        }
      }
    },
    "strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "requires": {
        "ansi-regex": "^5.0.1"
      }
    },
    "strip-bom": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-2.0.0.tgz",
      "integrity": "sha1-YhmoVhZSBJHzV4i9vxRHqZx+aw4=",
      "dev": true,
      "requires": {
        "is-utf8": "^0.2.0"
      }
    },
    "strip-indent": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/strip-indent/-/strip-indent-1.0.1.tgz",
      "integrity": "sha1-DHlipq3vp7vUrDZkYKY4VSrhoKI=",
      "dev": true,
      "requires": {
        "get-stdin": "^4.0.1"
      }
    },
    "strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha512-4gB8na07fecVVkOI6Rs4e7T6NOTki5EmL7TUduTs6bu3EdnSycntVJ4re8kgZA+wx9IueI2Y11bfbgwtzuE0KQ=="
    },
    "stripe": {
      "version": "8.222.0",
      "resolved": "https://registry.npmjs.org/stripe/-/stripe-8.222.0.tgz",
      "integrity": "sha512-hrA79fjmN2Eb6K3kxkDzU4ODeVGGjXQsuVaAPSUro6I9MM3X+BvIsVqdphm3BXWfimAGFvUqWtPtHy25mICY1w==",
      "requires": {
        "@types/node": ">=8.1.0",
        "qs": "^6.10.3"
      },
      "dependencies": {
        "qs": {
          "version": "6.11.1",
          "resolved": "https://registry.npmjs.org/qs/-/qs-6.11.1.tgz",
          "integrity": "sha512-0wsrzgTz/kAVIeuxSjnpGC56rzYtr6JT/2BwEvMaPhFIoYa1aGO8LbzuU1R0uUYQkLpWBTOj0l/CLAJB64J6nQ==",
          "requires": {
            "side-channel": "^1.0.4"
          }
        }
      }
    },
    "stubs": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/stubs/-/stubs-3.0.0.tgz",
      "integrity": "sha512-PdHt7hHUJKxvTCgbKX9C1V/ftOcjJQgz8BZwNfV5c4B6dcGqlpelTbJ999jBGZ2jYiPAwcX5dP6oBwVlBlUbxw=="
    },
    "stylis": {
      "version": "4.0.13",
      "resolved": "https://registry.npmjs.org/stylis/-/stylis-4.0.13.tgz",
      "integrity": "sha512-xGPXiFVl4YED9Jh7Euv2V220mriG9u4B2TA6Ybjc1catrstKD2PpIdU3U0RKpkVBC2EhmL/F0sPCr9vrFTNRag=="
    },
    "stylis-plugin-rtl": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/stylis-plugin-rtl/-/stylis-plugin-rtl-2.1.1.tgz",
      "integrity": "sha512-q6xIkri6fBufIO/sV55md2CbgS5c6gg9EhSVATtHHCdOnbN/jcI0u3lYhNVeuI65c4lQPo67g8xmq5jrREvzlg==",
      "requires": {
        "cssjanus": "^2.0.1"
      }
    },
    "sudo-prompt": {
      "version": "9.2.1",
      "resolved": "https://registry.npmjs.org/sudo-prompt/-/sudo-prompt-9.2.1.tgz",
      "integrity": "sha512-Mu7R0g4ig9TUuGSxJavny5Rv0egCEtpZRNMrZaYS1vxkiIxGiGUwoezU3LazIQ+KE04hTrTfNPgxU5gzi7F5Pw=="
    },
    "supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
      "requires": {
        "has-flag": "^3.0.0"
      }
    },
    "supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w=="
    },
    "svgo": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/svgo/-/svgo-1.3.2.tgz",
      "integrity": "sha512-yhy/sQYxR5BkC98CY7o31VGsg014AKLEPxdfhora76l36hD9Rdy5NZA/Ocn6yayNPgSamYdtX2rFJdcv07AYVw==",
      "requires": {
        "chalk": "^2.4.1",
        "coa": "^2.0.2",
        "css-select": "^2.0.0",
        "css-select-base-adapter": "^0.1.1",
        "css-tree": "1.0.0-alpha.37",
        "csso": "^4.0.2",
        "js-yaml": "^3.13.1",
        "mkdirp": "~0.5.1",
        "object.values": "^1.1.0",
        "sax": "~1.2.4",
        "stable": "^0.1.8",
        "unquote": "~1.1.1",
        "util.promisify": "~1.0.0"
      },
      "dependencies": {
        "sax": {
          "version": "1.2.4",
          "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
          "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
        }
      }
    },
    "symbol-tree": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
      "integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw=="
    },
    "tapable": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.1.3.tgz",
      "integrity": "sha512-4WK/bYZmj8xLr+HUCODHGF1ZFzsYffasLUgEiMBY4fgtltdO6B4WJtlSbPaDTLpYTcGVwM2qLnFTICEcNxs3kA==",
      "dev": true
    },
    "tar": {
      "version": "6.1.13",
      "resolved": "https://registry.npmjs.org/tar/-/tar-6.1.13.tgz",
      "integrity": "sha512-jdIBIN6LTIe2jqzay/2vtYLlBHa3JF42ot3h1dW8Q0PaAG4v8rm0cvpVePtau5C6OKXGGcgO9q2AMNSWxiLqKw==",
      "requires": {
        "chownr": "^2.0.0",
        "fs-minipass": "^2.0.0",
        "minipass": "^4.0.0",
        "minizlib": "^2.1.1",
        "mkdirp": "^1.0.3",
        "yallist": "^4.0.0"
      },
      "dependencies": {
        "mkdirp": {
          "version": "1.0.4",
          "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
          "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw=="
        },
        "yallist": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
          "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
        }
      }
    },
    "tar-fs": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/tar-fs/-/tar-fs-2.1.1.tgz",
      "integrity": "sha512-V0r2Y9scmbDRLCNex/+hYzvp/zyYjvFbHPNgVTKfQvVrb6guiE/fxP+XblDNR011utopbkex2nM4dHNV6GDsng==",
      "requires": {
        "chownr": "^1.1.1",
        "mkdirp-classic": "^0.5.2",
        "pump": "^3.0.0",
        "tar-stream": "^2.1.4"
      },
      "dependencies": {
        "chownr": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
          "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg=="
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        }
      }
    },
    "tar-stream": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.2.0.tgz",
      "integrity": "sha512-ujeqbceABgwMZxEJnk2HDY2DlnUZ+9oEcb1KzTVfYHio0UE6dG71n60d8D2I4qNvleWrrXpmjpt7vZeF1LnMZQ==",
      "requires": {
        "bl": "^4.0.3",
        "end-of-stream": "^1.4.1",
        "fs-constants": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.1.1"
      }
    },
    "tarn": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/tarn/-/tarn-3.0.2.tgz",
      "integrity": "sha512-51LAVKUSZSVfI05vjPESNc5vwqqZpbXCsU+/+wxlOrUjk2SnFTt97v9ZgQrD4YmxYW1Px6w2KjaDitCfkvgxMQ=="
    },
    "teeny-request": {
      "version": "3.11.3",
      "resolved": "https://registry.npmjs.org/teeny-request/-/teeny-request-3.11.3.tgz",
      "integrity": "sha512-CKncqSF7sH6p4rzCgkb/z/Pcos5efl0DmolzvlqRQUNcpRIruOhY9+T1FsIlyEbfWd7MsFpodROOwHYh2BaXzw==",
      "requires": {
        "https-proxy-agent": "^2.2.1",
        "node-fetch": "^2.2.0",
        "uuid": "^3.3.2"
      },
      "dependencies": {
        "agent-base": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
          "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
          "requires": {
            "es6-promisify": "^5.0.0"
          }
        },
        "debug": {
          "version": "3.2.7",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
          "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "https-proxy-agent": {
          "version": "2.2.4",
          "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.4.tgz",
          "integrity": "sha512-OmvfoQ53WLjtA9HeYP9RNrWMJzzAz1JGaSFr1nijg0PVR1JaD/xbJq1mdEIIlxGpXp9eSe/O2LgU9DJmTPd0Eg==",
          "requires": {
            "agent-base": "^4.3.0",
            "debug": "^3.1.0"
          }
        }
      }
    },
    "terser": {
      "version": "4.8.0",
      "resolved": "https://registry.npmjs.org/terser/-/terser-4.8.0.tgz",
      "integrity": "sha512-EAPipTNeWsb/3wLPeup1tVPaXfIaU68xMnVdPafIL1TV05OhASArYyIfFvnvJCNrR2NIOvDVNNTFRa+Re2MWyw==",
      "dev": true,
      "requires": {
        "commander": "^2.20.0",
        "source-map": "~0.6.1",
        "source-map-support": "~0.5.12"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "terser-webpack-plugin": {
      "version": "1.4.5",
      "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-1.4.5.tgz",
      "integrity": "sha512-04Rfe496lN8EYruwi6oPQkG0vo8C+HT49X687FZnpPF0qMAIHONI6HEXYPKDOE8e5HjXTyKfqRd/agHtH0kOtw==",
      "dev": true,
      "requires": {
        "cacache": "^12.0.2",
        "find-cache-dir": "^2.1.0",
        "is-wsl": "^1.1.0",
        "schema-utils": "^1.0.0",
        "serialize-javascript": "^4.0.0",
        "source-map": "^0.6.1",
        "terser": "^4.1.2",
        "webpack-sources": "^1.4.0",
        "worker-farm": "^1.7.0"
      },
      "dependencies": {
        "find-cache-dir": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.1.0.tgz",
          "integrity": "sha512-Tq6PixE0w/VMFfCgbONnkiQIVol/JJL7nRMi20fqzA4NRs9AfeqMGeRdPi3wIhYkxjeBaWh2rxwapn5Tu3IqOQ==",
          "dev": true,
          "requires": {
            "commondir": "^1.0.1",
            "make-dir": "^2.0.0",
            "pkg-dir": "^3.0.0"
          }
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "make-dir": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
          "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
          "dev": true,
          "requires": {
            "pify": "^4.0.1",
            "semver": "^5.6.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
          "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU=",
          "dev": true
        },
        "pkg-dir": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
          "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
          "dev": true,
          "requires": {
            "find-up": "^3.0.0"
          }
        },
        "schema-utils": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
          "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-errors": "^1.0.0",
            "ajv-keywords": "^3.1.0"
          }
        },
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
          "dev": true
        },
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "text-hex": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/text-hex/-/text-hex-1.0.0.tgz",
      "integrity": "sha512-uuVGNWzgJ4yhRaNSiubPY7OjISw4sw4E5Uv0wbjp+OzcbmVU/rsT8ujgcXJhn9ypzsgr5vlzpPqP+MBBKcGvbg=="
    },
    "through": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
      "integrity": "sha1-DdTJ/6q8NXlgsbckEV1+Doai4fU="
    },
    "through2": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/through2/-/through2-0.4.2.tgz",
      "integrity": "sha1-2/WGYDEVHsg1K7bE22SiKSqEC5s=",
      "requires": {
        "readable-stream": "~1.0.17",
        "xtend": "~2.1.1"
      },
      "dependencies": {
        "isarray": {
          "version": "0.0.1",
          "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
          "integrity": "sha1-ihis/Kmo9Bd+Cav8YDiTmwXR7t8="
        },
        "object-keys": {
          "version": "0.4.0",
          "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-0.4.0.tgz",
          "integrity": "sha1-KKaq50KN0sOpLz2V8hM13SBOAzY="
        },
        "readable-stream": {
          "version": "1.0.34",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-1.0.34.tgz",
          "integrity": "sha1-Elgg40vIQtLyqq+v5MKRbuMsFXw=",
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.1",
            "isarray": "0.0.1",
            "string_decoder": "~0.10.x"
          }
        },
        "string_decoder": {
          "version": "0.10.31",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-0.10.31.tgz",
          "integrity": "sha1-YuIDvEF2bGwoyfyEMB2rHFMQ+pQ="
        },
        "xtend": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/xtend/-/xtend-2.1.2.tgz",
          "integrity": "sha1-bv7MKk2tjmlixJAbM3znuoe10os=",
          "requires": {
            "object-keys": "~0.4.0"
          }
        }
      }
    },
    "timers-browserify": {
      "version": "2.0.12",
      "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.12.tgz",
      "integrity": "sha512-9phl76Cqm6FhSX9Xe1ZUAMLtm1BLkKj2Qd5ApyWkXzsMRaA7dgr81kf4wJmQf/hAvg8EEyJxDo3du/0KlhPiKQ==",
      "dev": true,
      "requires": {
        "setimmediate": "^1.0.4"
      }
    },
    "tiny-invariant": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.0.6.tgz",
      "integrity": "sha512-FOyLWWVjG+aC0UqG76V53yAWdXfH8bO6FNmyZOuUrzDzK8DI3/JRY25UD7+g49JWM1LXwymsKERB+DzI0dTEQA=="
    },
    "tiny-warning": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/tiny-warning/-/tiny-warning-1.0.3.tgz",
      "integrity": "sha512-lBN9zLN/oAf68o3zNXYrdCt1kP8WsiGW8Oo2ka41b2IM5JL/S1CTyX1rW0mb/zSuJun0ZUrDxx4sqvYS2FWzPA=="
    },
    "to-array": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/to-array/-/to-array-0.1.4.tgz",
      "integrity": "sha512-LhVdShQD/4Mk4zXNroIQZJC+Ap3zgLcDuwEdcmLv9CCO73NWockQDwyUnW/m8VX/EElfL6FcYx7EeutN4HJA6A=="
    },
    "to-arraybuffer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
      "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M=",
      "dev": true
    },
    "to-fast-properties": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
      "integrity": "sha1-3F5pjL0HkmW8c+A3doGk5Og/YW4="
    },
    "to-iso-string": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/to-iso-string/-/to-iso-string-0.0.2.tgz",
      "integrity": "sha512-oeHLgfWA7d0CPQa6h0+i5DAJZISz5un0d5SHPkw+Untclcvzv9T+AC3CvGXlZJdOlIbxbTfyyzlqCXc5hjpXYg=="
    },
    "to-object-path": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
      "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
      "dev": true,
      "requires": {
        "kind-of": "^3.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "3.2.2",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
          "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
          "dev": true,
          "requires": {
            "is-buffer": "^1.1.5"
          }
        }
      }
    },
    "to-regex": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
      "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
      "dev": true,
      "requires": {
        "define-property": "^2.0.2",
        "extend-shallow": "^3.0.2",
        "regex-not": "^1.0.2",
        "safe-regex": "^1.1.0"
      }
    },
    "to-regex-range": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
      "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
      "dev": true,
      "requires": {
        "is-number": "^3.0.0",
        "repeat-string": "^1.6.1"
      }
    },
    "toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA=="
    },
    "tough-cookie": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-3.0.1.tgz",
      "integrity": "sha512-yQyJ0u4pZsv9D4clxO69OEjLWYw+jbgspjTue4lTQZLfV0c5l1VmK2y1JK8E9ahdpltPOaAThPcp5nKPUgSnsg==",
      "requires": {
        "ip-regex": "^2.1.0",
        "psl": "^1.1.28",
        "punycode": "^2.1.1"
      }
    },
    "tr46": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-1.0.1.tgz",
      "integrity": "sha512-dTpowEjclQ7Kgx5SdBkqRzVhERQXov8/l9Ft9dVM9fmg0W0KQSVaXX9T4i6twCPNtYiZM53lpSSUAwJbFPOHxA==",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "trim-newlines": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/trim-newlines/-/trim-newlines-1.0.0.tgz",
      "integrity": "sha1-WIeWa7WCpFA6QetST301ARgVphM=",
      "dev": true
    },
    "trim-right": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/trim-right/-/trim-right-1.0.1.tgz",
      "integrity": "sha1-yy4SAwZ+DI3h9hQJS5/kVwTqYAM=",
      "dev": true
    },
    "triple-beam": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/triple-beam/-/triple-beam-1.3.0.tgz",
      "integrity": "sha512-XrHUvV5HpdLmIj4uVMxHggLbFSZYIn7HEWsqePZcI50pco+MPqJ50wMGY794X7AOOhxOBAjbkqfAbEe/QMp2Lw=="
    },
    "true-case-path": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/true-case-path/-/true-case-path-1.0.3.tgz",
      "integrity": "sha512-m6s2OdQe5wgpFMC+pAJ+q9djG82O2jcHPOI6RNg1yy9rCYR+WD6Nbpl32fDpfC56nirdRy+opFa/Vk7HYhqaew==",
      "dev": true,
      "requires": {
        "glob": "^7.1.2"
      }
    },
    "tryer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/tryer/-/tryer-1.0.1.tgz",
      "integrity": "sha512-c3zayb8/kWWpycWYg87P71E1S1ZL6b6IJxfb5fvsUgsf0S2MVGaDhDXXjDMpdCpfWXqptc+4mXwmiy1ypXqRAA==",
      "dev": true
    },
    "tsconfig-paths": {
      "version": "3.12.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.12.0.tgz",
      "integrity": "sha512-e5adrnOYT6zqVnWqZu7i/BQ3BnhzvGbjEjejFXO20lKIKpwTaupkCPgEfv4GZK1IBciJUEhYs3J3p75FdaTFVg==",
      "requires": {
        "@types/json5": "^0.0.29",
        "json5": "^1.0.1",
        "minimist": "^1.2.0",
        "strip-bom": "^3.0.0"
      },
      "dependencies": {
        "json5": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
          "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
          "requires": {
            "minimist": "^1.2.0"
          }
        },
        "strip-bom": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
          "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM="
        }
      }
    },
    "tslib": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.5.0.tgz",
      "integrity": "sha512-336iVw3rtn2BUK7ORdIAHTyxHGRIHVReokCR3XjbckJMK7ms8FysBfhLR8IXnAgy7T0PTPNBWKiH514FOW/WSg=="
    },
    "tslint": {
      "version": "5.20.1",
      "resolved": "https://registry.npmjs.org/tslint/-/tslint-5.20.1.tgz",
      "integrity": "sha512-EcMxhzCFt8k+/UP5r8waCf/lzmeSyVlqxqMEDQE7rWYiQky8KpIBz1JAoYXfROHrPZ1XXd43q8yQnULOLiBRQg==",
      "dev": true,
      "requires": {
        "@babel/code-frame": "^7.0.0",
        "builtin-modules": "^1.1.1",
        "chalk": "^2.3.0",
        "commander": "^2.12.1",
        "diff": "^4.0.1",
        "glob": "^7.1.1",
        "js-yaml": "^3.13.1",
        "minimatch": "^3.0.4",
        "mkdirp": "^0.5.1",
        "resolve": "^1.3.2",
        "semver": "^5.3.0",
        "tslib": "^1.8.0",
        "tsutils": "^2.29.0"
      },
      "dependencies": {
        "diff": {
          "version": "4.0.2",
          "resolved": "https://registry.npmjs.org/diff/-/diff-4.0.2.tgz",
          "integrity": "sha512-58lmxKSA4BNyLz+HHMUzlOEpg09FV+ev6ZMe3vJihgdxzgcwZ8VoEEPmALCZG9LmqfVoNMMKpttIYTVG6uDY7A==",
          "dev": true
        },
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
          "dev": true
        },
        "tslib": {
          "version": "1.14.1",
          "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
          "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg==",
          "dev": true
        }
      }
    },
    "tslint-react": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/tslint-react/-/tslint-react-3.6.0.tgz",
      "integrity": "sha512-AIv1QcsSnj7e9pFir6cJ6vIncTqxfqeFF3Lzh8SuuBljueYzEAtByuB6zMaD27BL0xhMEqsZ9s5eHuCONydjBw==",
      "dev": true,
      "requires": {
        "tsutils": "^2.13.1"
      }
    },
    "tsutils": {
      "version": "2.29.0",
      "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-2.29.0.tgz",
      "integrity": "sha512-g5JVHCIJwzfISaXpXE1qvNalca5Jwob6FjI4AoPlqMusJ6ftFE7IkkFoMhVLRgK+4Kx3gkzb8UZK5t5yTTvEmA==",
      "dev": true,
      "requires": {
        "tslib": "^1.8.1"
      },
      "dependencies": {
        "tslib": {
          "version": "1.14.1",
          "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
          "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg==",
          "dev": true
        }
      }
    },
    "tty-browserify": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
      "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY=",
      "dev": true
    },
    "tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
      "requires": {
        "safe-buffer": "^5.0.1"
      }
    },
    "tweetnacl": {
      "version": "0.14.5",
      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
      "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
    },
    "type-check": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
      "integrity": "sha512-ZCmOJdvOWDBYJlzAoFkC+Q0+bUyEOS1ltgp1MGU03fqHG+dbi9tBFU2Rd9QKiDZFAYrhPh2JUf7rZRIuHRKtOg==",
      "requires": {
        "prelude-ls": "~1.1.2"
      }
    },
    "type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "requires": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      }
    },
    "typed-array-length": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.4.tgz",
      "integrity": "sha512-KjZypGq+I/H7HI5HlOoGHkWUUGq+Q0TPhQurLbyrVrvnKTBgzLhIJ7j6J/XTQOi0d1RjyZ0wdas8bKs2p0x3Ng==",
      "requires": {
        "call-bind": "^1.0.2",
        "for-each": "^0.3.3",
        "is-typed-array": "^1.1.9"
      }
    },
    "typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c="
    },
    "typescript": {
      "version": "4.5.5",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-4.5.5.tgz",
      "integrity": "sha512-TCTIul70LyWe6IJWT8QSYeA54WQe8EjQFU4wY52Fasj5UKx88LNYKCgBEHcOMOrFF1rKGbD8v/xcNWVUq9SymA=="
    },
    "uglify-js": {
      "version": "3.17.4",
      "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.17.4.tgz",
      "integrity": "sha512-T9q82TJI9e/C1TAxYvfb16xO120tMVFZrGA3f9/P4424DNu6ypK103y0GPFVa17yotwSyZW5iYXgjYHkGrJW/g=="
    },
    "unbox-primitive": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.0.2.tgz",
      "integrity": "sha512-61pPlCD9h51VoreyJ0BReideM3MDKMKnh6+V9L08331ipq6Q8OFXZYiqP6n/tbHx4s5I9uRhcye6BrbkizkBDw==",
      "requires": {
        "call-bind": "^1.0.2",
        "has-bigints": "^1.0.2",
        "has-symbols": "^1.0.3",
        "which-boxed-primitive": "^1.0.2"
      },
      "dependencies": {
        "has-symbols": {
          "version": "1.0.3",
          "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
          "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
        }
      }
    },
    "unbzip2-stream": {
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/unbzip2-stream/-/unbzip2-stream-1.4.3.tgz",
      "integrity": "sha512-mlExGW4w71ebDJviH16lQLtZS32VKqsSfk80GCfUlwT/4/hNRFsoscrF/c++9xinkMzECL1uL9DDwXqFWkruPg==",
      "dev": true,
      "requires": {
        "buffer": "^5.2.1",
        "through": "^2.3.8"
      },
      "dependencies": {
        "buffer": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
          "integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
          "dev": true,
          "requires": {
            "base64-js": "^1.3.1",
            "ieee754": "^1.1.13"
          }
        }
      }
    },
    "undici": {
      "version": "5.22.0",
      "resolved": "https://registry.npmjs.org/undici/-/undici-5.22.0.tgz",
      "integrity": "sha512-fR9RXCc+6Dxav4P9VV/sp5w3eFiSdOjJYsbtWfd4s5L5C4ogyuVpdKIVHeW0vV1MloM65/f7W45nR9ZxwVdyiA==",
      "requires": {
        "busboy": "^1.6.0"
      }
    },
    "unicode-canonical-property-names-ecmascript": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/unicode-canonical-property-names-ecmascript/-/unicode-canonical-property-names-ecmascript-2.0.0.tgz",
      "integrity": "sha512-yY5PpDlfVIU5+y/BSCxAJRBIS1Zc2dDG3Ujq+sR0U+JjUevW2JhocOF+soROYDSaAezOzOKuyyixhD6mBknSmQ==",
      "dev": true
    },
    "unicode-match-property-ecmascript": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/unicode-match-property-ecmascript/-/unicode-match-property-ecmascript-2.0.0.tgz",
      "integrity": "sha512-5kaZCrbp5mmbz5ulBkDkbY0SsPOjKqVS35VpL9ulMPfSl0J0Xsm+9Evphv9CoIZFwre7aJoa94AY6seMKGVN5Q==",
      "dev": true,
      "requires": {
        "unicode-canonical-property-names-ecmascript": "^2.0.0",
        "unicode-property-aliases-ecmascript": "^2.0.0"
      }
    },
    "unicode-match-property-value-ecmascript": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/unicode-match-property-value-ecmascript/-/unicode-match-property-value-ecmascript-2.0.0.tgz",
      "integrity": "sha512-7Yhkc0Ye+t4PNYzOGKedDhXbYIBe1XEQYQxOPyhcXNMJ0WCABqqj6ckydd6pWRZTHV4GuCPKdBAUiMc60tsKVw==",
      "dev": true
    },
    "unicode-property-aliases-ecmascript": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/unicode-property-aliases-ecmascript/-/unicode-property-aliases-ecmascript-2.0.0.tgz",
      "integrity": "sha512-5Zfuy9q/DFr4tfO7ZPeVXb1aPoeQSdeFMLpYuFebehDAhbuevLs5yxSZmIFN1tP5F9Wl4IpJrYojg85/zgyZHQ==",
      "dev": true
    },
    "union-value": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",
      "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",
      "dev": true,
      "requires": {
        "arr-union": "^3.1.0",
        "get-value": "^2.0.6",
        "is-extendable": "^0.1.1",
        "set-value": "^2.0.1"
      },
      "dependencies": {
        "is-extendable": {
          "version": "0.1.1",
          "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
          "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik=",
          "dev": true
        }
      }
    },
    "unique-filename": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.1.tgz",
      "integrity": "sha512-Vmp0jIp2ln35UTXuryvjzkjGdRyf9b2lTXuSYUiPmzRcl3FDtYqAwOnTJkAngD9SWhnoJzDbTKwaOrZ+STtxNQ==",
      "dev": true,
      "requires": {
        "unique-slug": "^2.0.0"
      }
    },
    "unique-slug": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.2.tgz",
      "integrity": "sha512-zoWr9ObaxALD3DOPfjPSqxt4fnZiWblxHIgeWqW8x7UqDzEtHEQLzji2cuJYQFCU6KmoJikOYAZlrTHHebjx2w==",
      "dev": true,
      "requires": {
        "imurmurhash": "^0.1.4"
      }
    },
    "unique-string": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unique-string/-/unique-string-1.0.0.tgz",
      "integrity": "sha512-ODgiYu03y5g76A1I9Gt0/chLCzQjvzDy7DsZGsLOE/1MrF6wriEskSncj1+/C58Xk/kPZDppSctDybCwOSaGAg==",
      "requires": {
        "crypto-random-string": "^1.0.0"
      }
    },
    "unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha1-sr9O6FFKrmFltIF4KdIbLvSZBOw="
    },
    "unquote": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/unquote/-/unquote-1.1.1.tgz",
      "integrity": "sha512-vRCqFv6UhXpWxZPyGDh/F3ZpNv8/qo7w6iufLpQg9aKnQ71qM4B5KiI7Mia9COcjEhrO9LueHpMYjYzsWH3OIg=="
    },
    "unset-value": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
      "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
      "dev": true,
      "requires": {
        "has-value": "^0.3.1",
        "isobject": "^3.0.0"
      },
      "dependencies": {
        "has-value": {
          "version": "0.3.1",
          "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
          "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
          "dev": true,
          "requires": {
            "get-value": "^2.0.3",
            "has-values": "^0.1.4",
            "isobject": "^2.0.0"
          },
          "dependencies": {
            "isobject": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
              "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
              "dev": true,
              "requires": {
                "isarray": "1.0.0"
              }
            }
          }
        },
        "has-values": {
          "version": "0.1.4",
          "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
          "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E=",
          "dev": true
        }
      }
    },
    "upath": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/upath/-/upath-1.2.0.tgz",
      "integrity": "sha512-aZwGpamFO61g3OlfT7OQCHqhGnW43ieH9WZeP7QxN/G/jS4jfqUkZxoryvJgVPEcrl5NL/ggHsSmLMHuH64Lhg==",
      "dev": true,
      "optional": true
    },
    "upper-case": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/upper-case/-/upper-case-1.1.3.tgz",
      "integrity": "sha512-WRbjgmYzgXkCV7zNVpy5YgrHgbBv126rMALQQMrmzOVC4GM2waQ9x7xtm8VU+1yF2kWyPzI9zbZ48n4vSxwfSA=="
    },
    "uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "requires": {
        "punycode": "^2.1.0"
      }
    },
    "urix": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
      "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI=",
      "dev": true
    },
    "url": {
      "version": "0.10.3",
      "resolved": "https://registry.npmjs.org/url/-/url-0.10.3.tgz",
      "integrity": "sha512-hzSUW2q06EqL1gKM/a+obYHLIO6ct2hwPuviqTTOcfFVc61UbfJ2Q32+uGL/HCPxKqrdGB5QUwIe7UqlDgwsOQ==",
      "requires": {
        "punycode": "1.3.2",
        "querystring": "0.2.0"
      },
      "dependencies": {
        "punycode": {
          "version": "1.3.2",
          "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
          "integrity": "sha512-RofWgt/7fL5wP1Y7fxE7/EmTLzQVnB0ycyibJ0OOHIlJqTNzglYFxVwETOcIoJqJmpDXJ9xImDv+Fq34F/d4Dw=="
        }
      }
    },
    "url-join": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/url-join/-/url-join-4.0.1.tgz",
      "integrity": "sha512-jk1+QP6ZJqyOiuEI9AEWQfju/nB2Pw466kbA0LEZljHwKeMgd9WrAEgEGxjPDD2+TNbbb37rTyhEfrCXfuKXnA=="
    },
    "url-loader": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/url-loader/-/url-loader-1.1.2.tgz",
      "integrity": "sha512-dXHkKmw8FhPqu8asTc1puBfe3TehOCo2+RmOOev5suNCIYBcT626kxiWg1NBVkwc4rO8BGa7gP70W7VXuqHrjg==",
      "dev": true,
      "requires": {
        "loader-utils": "^1.1.0",
        "mime": "^2.0.3",
        "schema-utils": "^1.0.0"
      },
      "dependencies": {
        "schema-utils": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
          "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-errors": "^1.0.0",
            "ajv-keywords": "^3.1.0"
          }
        }
      }
    },
    "use": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
      "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ==",
      "dev": true
    },
    "util": {
      "version": "0.11.1",
      "resolved": "https://registry.npmjs.org/util/-/util-0.11.1.tgz",
      "integrity": "sha512-HShAsny+zS2TZfaXxD9tYj4HQGlBezXZMZuM/S5PKLLoZkShZiGk9o5CzukI1LVHZvjdvZ2Sj1aW/Ndn2NB/HQ==",
      "dev": true,
      "requires": {
        "inherits": "2.0.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.3",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
          "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4=",
          "dev": true
        }
      }
    },
    "util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8="
    },
    "util.promisify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/util.promisify/-/util.promisify-1.0.1.tgz",
      "integrity": "sha512-g9JpC/3He3bm38zsLupWryXHoEcS22YHthuPQSJdMy6KNrzIRzWqcsHzD/WUnqe45whVou4VIsPew37DoXWNrA==",
      "requires": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.2",
        "has-symbols": "^1.0.1",
        "object.getownpropertydescriptors": "^2.1.0"
      }
    },
    "utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha1-n5VxD1CiZ5R7LMwSR0HBAoQn5xM="
    },
    "uuid": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.4.0.tgz",
      "integrity": "sha512-HjSDRw6gZE5JMggctHBcjVak08+KEVhSIiDzFnT9S9aegmp85S/bReBVTb4QTFaRNptJ9kuYaNhnbNEOkbKb/A=="
    },
    "v8-compile-cache": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/v8-compile-cache/-/v8-compile-cache-2.3.0.tgz",
      "integrity": "sha512-l8lCEmLcLYZh4nbunNZvQCJc5pv7+RCwa8q/LdUx8u7lsWvPDKmpodJAJNwkAhJC//dFY48KuIEmjtd4RViDrA==",
      "dev": true
    },
    "validate-npm-package-license": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
      "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
      "dev": true,
      "requires": {
        "spdx-correct": "^3.0.0",
        "spdx-expression-parse": "^3.0.0"
      }
    },
    "value-equal": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/value-equal/-/value-equal-1.0.1.tgz",
      "integrity": "sha512-NOJ6JZCAWr0zlxZt+xqCHNTEKOsrks2HQd4MqhP1qy4z1SkbEP467eNx6TgDKXMvUOb+OENfJCZwM+16n7fRfw=="
    },
    "vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha1-IpnwLG3tMNSllhsLn3RSShj2NPw="
    },
    "verror": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
      "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
      "requires": {
        "assert-plus": "^1.0.0",
        "core-util-is": "1.0.2",
        "extsprintf": "^1.2.0"
      }
    },
    "vm-browserify": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-1.1.2.tgz",
      "integrity": "sha512-2ham8XPWTONajOR0ohOKOHXkm3+gaBmGut3SRuu75xLd/RRaY6vqgh8NBYYk7+RW3u5AtzPQZG8F10LHkl0lAQ==",
      "dev": true
    },
    "w3c-hr-time": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/w3c-hr-time/-/w3c-hr-time-1.0.2.tgz",
      "integrity": "sha512-z8P5DvDNjKDoFIHK7q8r8lackT6l+jo/Ye3HOle7l9nICP9lf1Ci25fy9vHd0JOWewkIFzXIEig3TdKT7JQ5fQ==",
      "requires": {
        "browser-process-hrtime": "^1.0.0"
      }
    },
    "w3c-xmlserializer": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/w3c-xmlserializer/-/w3c-xmlserializer-1.1.2.tgz",
      "integrity": "sha512-p10l/ayESzrBMYWRID6xbuCKh2Fp77+sA0doRuGn4tTIMrrZVeqfpKjXHY+oDh3K4nLdPgNwMTVP6Vp4pvqbNg==",
      "requires": {
        "domexception": "^1.0.1",
        "webidl-conversions": "^4.0.2",
        "xml-name-validator": "^3.0.0"
      }
    },
    "warning": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/warning/-/warning-4.0.3.tgz",
      "integrity": "sha512-rpJyN222KWIvHJ/F53XSZv0Zl/accqHR8et1kpaMTD/fLCRxtV8iX8czMzY7sVZupTI3zcUTg8eycS2kNF9l6w==",
      "requires": {
        "loose-envify": "^1.0.0"
      }
    },
    "watchpack": {
      "version": "1.7.5",
      "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.7.5.tgz",
      "integrity": "sha512-9P3MWk6SrKjHsGkLT2KHXdQ/9SNkyoJbabxnKOoJepsvJjJG8uYTR3yTPxPQvNDI3w4Nz1xnE0TLHK4RIVe/MQ==",
      "dev": true,
      "requires": {
        "chokidar": "^3.4.1",
        "graceful-fs": "^4.1.2",
        "neo-async": "^2.5.0",
        "watchpack-chokidar2": "^2.0.1"
      }
    },
    "watchpack-chokidar2": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/watchpack-chokidar2/-/watchpack-chokidar2-2.0.1.tgz",
      "integrity": "sha512-nCFfBIPKr5Sh61s4LPpy1Wtfi0HE8isJ3d2Yb5/Ppw2P2B/3eVSEBjKfN0fmHJSK14+31KwMKmcrzs2GM4P0Ww==",
      "dev": true,
      "optional": true,
      "requires": {
        "chokidar": "^2.1.8"
      },
      "dependencies": {
        "anymatch": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
          "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
          "dev": true,
          "optional": true,
          "requires": {
            "micromatch": "^3.1.4",
            "normalize-path": "^2.1.1"
          },
          "dependencies": {
            "normalize-path": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
              "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
              "dev": true,
              "optional": true,
              "requires": {
                "remove-trailing-separator": "^1.0.1"
              }
            }
          }
        },
        "binary-extensions": {
          "version": "1.13.1",
          "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
          "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw==",
          "dev": true,
          "optional": true
        },
        "chokidar": {
          "version": "2.1.8",
          "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.1.8.tgz",
          "integrity": "sha512-ZmZUazfOzf0Nve7duiCKD23PFSCs4JPoYyccjUFF3aQkQadqBhfzhjkwBH2mNOG9cTBwhamM37EIsIkZw3nRgg==",
          "dev": true,
          "optional": true,
          "requires": {
            "anymatch": "^2.0.0",
            "async-each": "^1.0.1",
            "braces": "^2.3.2",
            "fsevents": "^1.2.7",
            "glob-parent": "^3.1.0",
            "inherits": "^2.0.3",
            "is-binary-path": "^1.0.0",
            "is-glob": "^4.0.0",
            "normalize-path": "^3.0.0",
            "path-is-absolute": "^1.0.0",
            "readdirp": "^2.2.1",
            "upath": "^1.1.1"
          }
        },
        "fsevents": {
          "version": "1.2.13",
          "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.13.tgz",
          "integrity": "sha512-oWb1Z6mkHIskLzEJ/XWX0srkpkTQ7vaopMQkyaEIoq0fmtFVxOthb8cCxeT+p3ynTdkk/RZwbgG4brR5BeWECw==",
          "dev": true,
          "optional": true,
          "requires": {
            "bindings": "^1.5.0",
            "nan": "^2.12.1"
          }
        },
        "glob-parent": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
          "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
          "dev": true,
          "optional": true,
          "requires": {
            "is-glob": "^3.1.0",
            "path-dirname": "^1.0.0"
          },
          "dependencies": {
            "is-glob": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
              "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
              "dev": true,
              "optional": true,
              "requires": {
                "is-extglob": "^2.1.0"
              }
            }
          }
        },
        "is-binary-path": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
          "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
          "dev": true,
          "optional": true,
          "requires": {
            "binary-extensions": "^1.0.0"
          }
        },
        "readable-stream": {
          "version": "2.3.7",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.7.tgz",
          "integrity": "sha512-Ebho8K4jIbHAxnuxi7o42OrZgF/ZTNcsZj6nRKyUmkhLFq8CHItp/fy6hQZuZmP/n3yZ9VBUbp4zz/mX8hmYPw==",
          "dev": true,
          "optional": true,
          "requires": {
            "core-util-is": "~1.0.0",
            "inherits": "~2.0.3",
            "isarray": "~1.0.0",
            "process-nextick-args": "~2.0.0",
            "safe-buffer": "~5.1.1",
            "string_decoder": "~1.1.1",
            "util-deprecate": "~1.0.1"
          }
        },
        "readdirp": {
          "version": "2.2.1",
          "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
          "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
          "dev": true,
          "optional": true,
          "requires": {
            "graceful-fs": "^4.1.11",
            "micromatch": "^3.1.10",
            "readable-stream": "^2.0.2"
          }
        },
        "string_decoder": {
          "version": "1.1.1",
          "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
          "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
          "dev": true,
          "optional": true,
          "requires": {
            "safe-buffer": "~5.1.0"
          }
        }
      }
    },
    "webidl-conversions": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-4.0.2.tgz",
      "integrity": "sha512-YQ+BmxuTgd6UXZW3+ICGfyqRyHXVlD5GtQr5+qjiNW7bF0cqrzX500HVXPBOvgXb5YnzDd+h0zqyv61KUD7+Sg=="
    },
    "webpack": {
      "version": "4.46.0",
      "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.46.0.tgz",
      "integrity": "sha512-6jJuJjg8znb/xRItk7bkT0+Q7AHCYjjFnvKIWQPkNIOyRqoCGvkOs0ipeQzrqz4l5FtN5ZI/ukEHroeX/o1/5Q==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.9.0",
        "@webassemblyjs/helper-module-context": "1.9.0",
        "@webassemblyjs/wasm-edit": "1.9.0",
        "@webassemblyjs/wasm-parser": "1.9.0",
        "acorn": "^6.4.1",
        "ajv": "^6.10.2",
        "ajv-keywords": "^3.4.1",
        "chrome-trace-event": "^1.0.2",
        "enhanced-resolve": "^4.5.0",
        "eslint-scope": "^4.0.3",
        "json-parse-better-errors": "^1.0.2",
        "loader-runner": "^2.4.0",
        "loader-utils": "^1.2.3",
        "memory-fs": "^0.4.1",
        "micromatch": "^3.1.10",
        "mkdirp": "^0.5.3",
        "neo-async": "^2.6.1",
        "node-libs-browser": "^2.2.1",
        "schema-utils": "^1.0.0",
        "tapable": "^1.1.3",
        "terser-webpack-plugin": "^1.4.3",
        "watchpack": "^1.7.4",
        "webpack-sources": "^1.4.1"
      },
      "dependencies": {
        "acorn": {
          "version": "6.4.2",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.4.2.tgz",
          "integrity": "sha512-XtGIhXwF8YM8bJhGxG5kXgjkEuNGLTkoYqVE+KMR+aspr4KGYmKYg7yUe3KghyQ9yheNwLnjmzh/7+gfDBmHCQ==",
          "dev": true
        },
        "schema-utils": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
          "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
          "dev": true,
          "requires": {
            "ajv": "^6.1.0",
            "ajv-errors": "^1.0.0",
            "ajv-keywords": "^3.1.0"
          }
        }
      }
    },
    "webpack-bundle-analyzer": {
      "version": "3.9.0",
      "resolved": "https://registry.npmjs.org/webpack-bundle-analyzer/-/webpack-bundle-analyzer-3.9.0.tgz",
      "integrity": "sha512-Ob8amZfCm3rMB1ScjQVlbYYUEJyEjdEtQ92jqiFUYt5VkEeO2v5UMbv49P/gnmCZm3A6yaFQzCBvpZqN4MUsdA==",
      "dev": true,
      "requires": {
        "acorn": "^7.1.1",
        "acorn-walk": "^7.1.1",
        "bfj": "^6.1.1",
        "chalk": "^2.4.1",
        "commander": "^2.18.0",
        "ejs": "^2.6.1",
        "express": "^4.16.3",
        "filesize": "^3.6.1",
        "gzip-size": "^5.0.0",
        "lodash": "^4.17.19",
        "mkdirp": "^0.5.1",
        "opener": "^1.5.1",
        "ws": "^6.0.0"
      },
      "dependencies": {
        "acorn-walk": {
          "version": "7.2.0",
          "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-7.2.0.tgz",
          "integrity": "sha512-OPdCF6GsMIP+Az+aWfAAOEt2/+iVDKE7oy6lJ098aoe59oAmK76qV6Gw60SbZ8jHuG2wH058GF4pLFbYamYrVA==",
          "dev": true
        },
        "ws": {
          "version": "6.2.2",
          "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.2.tgz",
          "integrity": "sha512-zmhltoSR8u1cnDsD43TX59mzoMZsLKqUweyYBAIvTngR3shc0W6aOZylZmq/7hqyVxPdi+5Ud2QInblgyE72fw==",
          "dev": true,
          "requires": {
            "async-limiter": "~1.0.0"
          }
        }
      }
    },
    "webpack-cli": {
      "version": "3.3.12",
      "resolved": "https://registry.npmjs.org/webpack-cli/-/webpack-cli-3.3.12.tgz",
      "integrity": "sha512-NVWBaz9k839ZH/sinurM+HcDvJOTXwSjYp1ku+5XKeOC03z8v5QitnK/x+lAxGXFyhdayoIf/GOpv85z3/xPag==",
      "dev": true,
      "requires": {
        "chalk": "^2.4.2",
        "cross-spawn": "^6.0.5",
        "enhanced-resolve": "^4.1.1",
        "findup-sync": "^3.0.0",
        "global-modules": "^2.0.0",
        "import-local": "^2.0.0",
        "interpret": "^1.4.0",
        "loader-utils": "^1.4.0",
        "supports-color": "^6.1.0",
        "v8-compile-cache": "^2.1.1",
        "yargs": "^13.3.2"
      },
      "dependencies": {
        "cross-spawn": {
          "version": "6.0.5",
          "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
          "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
          "dev": true,
          "requires": {
            "nice-try": "^1.0.4",
            "path-key": "^2.0.1",
            "semver": "^5.5.0",
            "shebang-command": "^1.2.0",
            "which": "^1.2.9"
          }
        },
        "semver": {
          "version": "5.7.1",
          "resolved": "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz",
          "integrity": "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==",
          "dev": true
        },
        "supports-color": {
          "version": "6.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
          "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
          "dev": true,
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "webpack-sources": {
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.4.3.tgz",
      "integrity": "sha512-lgTS3Xhv1lCOKo7SA5TjKXMjpSM4sBjNV5+q2bqesbSPs5FjGmU6jjtBSkX9b4qW87vDIsCIlUPOEhbZrMdjeQ==",
      "dev": true,
      "requires": {
        "source-list-map": "^2.0.0",
        "source-map": "~0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "whatwg-encoding": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-1.0.5.tgz",
      "integrity": "sha512-b5lim54JOPN9HtzvK9HFXvBma/rnfFeqsic0hSpjtDbVxR3dJKLc+KB4V6GgiGOvl7CY/KNh8rxSo9DKQrnUEw==",
      "requires": {
        "iconv-lite": "0.4.24"
      }
    },
    "whatwg-mimetype": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/whatwg-mimetype/-/whatwg-mimetype-2.3.0.tgz",
      "integrity": "sha512-M4yMwr6mAnQz76TbJm914+gPpB/nCwvZbJU28cUD6dR004SAxDLOOSUaB1JDRqLtaOV/vi0IC5lEAGFgrjGv/g=="
    },
    "whatwg-url": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-7.1.0.tgz",
      "integrity": "sha512-WUu7Rg1DroM7oQvGWfOiAK21n74Gg+T4elXEQYkOhtyLeWiJFoOGLXPKI/9gzIie9CtwVLm8wtw6YJdKyxSjeg==",
      "requires": {
        "lodash.sortby": "^4.7.0",
        "tr46": "^1.0.1",
        "webidl-conversions": "^4.0.2"
      }
    },
    "which": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
      "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
      "dev": true,
      "requires": {
        "isexe": "^2.0.0"
      }
    },
    "which-boxed-primitive": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.0.2.tgz",
      "integrity": "sha512-bwZdv0AKLpplFY2KZRX6TvyuN7ojjr7lwkg6ml0roIy9YeuSr7JS372qlNW18UQYzgYK9ziGcerWqZOmEn9VNg==",
      "requires": {
        "is-bigint": "^1.0.1",
        "is-boolean-object": "^1.1.0",
        "is-number-object": "^1.0.4",
        "is-string": "^1.0.5",
        "is-symbol": "^1.0.3"
      }
    },
    "which-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
      "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho=",
      "dev": true
    },
    "which-pm-runs": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/which-pm-runs/-/which-pm-runs-1.1.0.tgz",
      "integrity": "sha512-n1brCuqClxfFfq/Rb0ICg9giSZqCS+pLtccdag6C2HyufBrh3fBOiy9nb6ggRMvWOVH5GrdJskj5iGTZNxd7SA=="
    },
    "which-typed-array": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.9.tgz",
      "integrity": "sha512-w9c4xkx6mPidwp7180ckYWfMmvxpjlZuIudNtDf4N/tTAUB8VJbX25qZoAsrtGuYNnGw3pa0AXgbGKRB8/EceA==",
      "requires": {
        "available-typed-arrays": "^1.0.5",
        "call-bind": "^1.0.2",
        "for-each": "^0.3.3",
        "gopd": "^1.0.1",
        "has-tostringtag": "^1.0.0",
        "is-typed-array": "^1.1.10"
      }
    },
    "wide-align": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/wide-align/-/wide-align-1.1.5.tgz",
      "integrity": "sha512-eDMORYaPNZ4sQIuuYPDHdQvf4gyCF9rEEV/yPxGfwPkRodwEgiMUUXTx/dex+Me0wxx53S+NgUHaP7y3MGlDmg==",
      "requires": {
        "string-width": "^1.0.2 || 2 || 3 || 4"
      }
    },
    "winston": {
      "version": "3.8.2",
      "resolved": "https://registry.npmjs.org/winston/-/winston-3.8.2.tgz",
      "integrity": "sha512-MsE1gRx1m5jdTTO9Ld/vND4krP2To+lgDoMEHGGa4HIlAUyXJtfc7CxQcGXVyz2IBpw5hbFkj2b/AtUdQwyRew==",
      "requires": {
        "@colors/colors": "1.5.0",
        "@dabh/diagnostics": "^2.0.2",
        "async": "^3.2.3",
        "is-stream": "^2.0.0",
        "logform": "^2.4.0",
        "one-time": "^1.0.0",
        "readable-stream": "^3.4.0",
        "safe-stable-stringify": "^2.3.1",
        "stack-trace": "0.0.x",
        "triple-beam": "^1.3.0",
        "winston-transport": "^4.5.0"
      },
      "dependencies": {
        "async": {
          "version": "3.2.4",
          "resolved": "https://registry.npmjs.org/async/-/async-3.2.4.tgz",
          "integrity": "sha512-iAB+JbDEGXhyIUavoDl9WP/Jj106Kz9DEn1DPgYw5ruDn0e3Wgi3sKFm55sASdGBNOQB8F59d9qQ7deqrHA8wQ=="
        }
      }
    },
    "winston-transport": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/winston-transport/-/winston-transport-4.5.0.tgz",
      "integrity": "sha512-YpZzcUzBedhlTAfJg6vJDlyEai/IFMIVcaEZZyl3UXIl4gmqRpU7AE89AHLkbzLUsv0NVmw7ts+iztqKxxPW1Q==",
      "requires": {
        "logform": "^2.3.2",
        "readable-stream": "^3.6.0",
        "triple-beam": "^1.3.0"
      }
    },
    "word-wrap": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.3.tgz",
      "integrity": "sha512-Hz/mrNwitNRh/HUAtM/VT/5VH+ygD6DV7mYKZAtHOrbs8U7lvPS6xf7EJKMF0uW1KJCl0H701g3ZGus+muE5vQ=="
    },
    "worker-farm": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.7.0.tgz",
      "integrity": "sha512-rvw3QTZc8lAxyVrqcSGVm5yP/IJ2UcB3U0graE3LCFoZ0Yn2x4EoVSqJKdB/T5M+FLcRPjz4TDacRf3OCfNUzw==",
      "dev": true,
      "requires": {
        "errno": "~0.1.7"
      }
    },
    "worker-injector-generator-plugin": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/worker-injector-generator-plugin/-/worker-injector-generator-plugin-1.0.4.tgz",
      "integrity": "sha512-Maro69A75OEBGYb/Qwk4E9ATy+jIbY2XoYQkWpRRwDXTNgH7nTTUI9Zz64HmGGCa01B5YB5n8C/xcQ/qQ8zOJw==",
      "dev": true
    },
    "wrap-ansi": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
      "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
      "dev": true,
      "requires": {
        "ansi-styles": "^3.2.0",
        "string-width": "^3.0.0",
        "strip-ansi": "^5.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
          "dev": true
        },
        "emoji-regex": {
          "version": "7.0.3",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
          "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA==",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
          "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
          "dev": true,
          "requires": {
            "emoji-regex": "^7.0.1",
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^5.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "dev": true,
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8="
    },
    "write-file-atomic": {
      "version": "2.4.3",
      "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-2.4.3.tgz",
      "integrity": "sha512-GaETH5wwsX+GcnzhPgKcKjJ6M2Cq3/iZp1WyY/X1CSqrW+jVNM9Y7D8EC2sM4ZG/V8wZlSniJnCKWPmBYAucRQ==",
      "requires": {
        "graceful-fs": "^4.1.11",
        "imurmurhash": "^0.1.4",
        "signal-exit": "^3.0.2"
      }
    },
    "ws": {
      "version": "7.5.7",
      "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.7.tgz",
      "integrity": "sha512-KMvVuFzpKBuiIXW3E4u3mySRO2/mCHSyZDJQM5NQ9Q9KHWHWh0NHgfbRMLLrceUK5qAL4ytALJbpRMjixFZh8A=="
    },
    "xdg-basedir": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/xdg-basedir/-/xdg-basedir-3.0.0.tgz",
      "integrity": "sha512-1Dly4xqlulvPD3fZUQJLY+FUIeqN3N2MM3uqe4rCJftAvOjFa3jFGfctOgluGx4ahPbUCsZkmJILiP0Vi4T6lQ=="
    },
    "xml-name-validator": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-3.0.0.tgz",
      "integrity": "sha512-A5CUptxDsvxKJEU3yO6DuWBSJz/qizqzJKOMIfUJHETbBw/sFaDxgd6fxm1ewUaM0jZ444Fc5vC5ROYurg/4Pw=="
    },
    "xml2js": {
      "version": "0.4.23",
      "resolved": "https://registry.npmjs.org/xml2js/-/xml2js-0.4.23.tgz",
      "integrity": "sha512-ySPiMjM0+pLDftHgXY4By0uswI3SPKLDw/i3UXbnO8M/p28zqexCUoPmQFrYD+/1BzhGJSs2i1ERWKJAtiLrug==",
      "requires": {
        "sax": ">=0.6.0",
        "xmlbuilder": "~11.0.0"
      }
    },
    "xmlbuilder": {
      "version": "11.0.1",
      "resolved": "https://registry.npmjs.org/xmlbuilder/-/xmlbuilder-11.0.1.tgz",
      "integrity": "sha512-fDlsI/kFEx7gLvbecc0/ohLG50fugQp8ryHzMTuW9vSa1GJ0XYWKnhsUx7oie3G98+r56aTQIUB4kht42R3JvA=="
    },
    "xmlchars": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/xmlchars/-/xmlchars-2.2.0.tgz",
      "integrity": "sha512-JZnDKK8B0RCDw84FNdDAIpZK+JuJw+s7Lz8nksI7SIuU3UXJJslUthsi+uWBUYOwPFwW7W7PRLRfUKpxjtjFCw=="
    },
    "xmlhttprequest-ssl": {
      "version": "1.6.3",
      "resolved": "https://registry.npmjs.org/xmlhttprequest-ssl/-/xmlhttprequest-ssl-1.6.3.tgz",
      "integrity": "sha512-3XfeQE/wNkvrIktn2Kf0869fC0BN6UpydVasGIeSm2B1Llihf7/0UfZM+eCkOw3P7bP4+qPgqhm7ZoxuJtFU0Q=="
    },
    "xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ=="
    },
    "y18n": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.3.tgz",
      "integrity": "sha512-JKhqTOwSrqNA1NY5lSztJ1GrBiUodLMmIZuLiDaMRJ+itFd+ABVE8XBjOvIWL+rSqNDC74LCSFmlb/U4UZ4hJQ==",
      "dev": true
    },
    "yallist": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-2.1.2.tgz",
      "integrity": "sha1-HBH5IY8HYImkfdUS+TxmmaaoHVI=",
      "dev": true
    },
    "yaml": {
      "version": "1.10.2",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-1.10.2.tgz",
      "integrity": "sha512-r3vXyErRCYJ7wg28yvBY5VSoAF8ZvlcW9/BwUzEtUsjvX/DKs24dIkuwjtuprwJJHsbyUbLApepYTR1BN4uHrg=="
    },
    "yargs": {
      "version": "13.3.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.2.tgz",
      "integrity": "sha512-AX3Zw5iPruN5ie6xGRIDgqkT+ZhnRlZMLMHAs8tg7nRruy2Nb+i5o9bwghAogtM08q1dpr2LVoS8KSTMYpWXUw==",
      "dev": true,
      "requires": {
        "cliui": "^5.0.0",
        "find-up": "^3.0.0",
        "get-caller-file": "^2.0.1",
        "require-directory": "^2.1.1",
        "require-main-filename": "^2.0.0",
        "set-blocking": "^2.0.0",
        "string-width": "^3.0.0",
        "which-module": "^2.0.0",
        "y18n": "^4.0.0",
        "yargs-parser": "^13.1.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
          "dev": true
        },
        "emoji-regex": {
          "version": "7.0.3",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
          "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA==",
          "dev": true
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "path-exists": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
          "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU=",
          "dev": true
        },
        "string-width": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
          "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
          "dev": true,
          "requires": {
            "emoji-regex": "^7.0.1",
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^5.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "dev": true,
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "yargs-parser": {
      "version": "13.1.2",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-13.1.2.tgz",
      "integrity": "sha512-3lbsNRf/j+A4QuSZfDRA7HRSfWrzO0YjqTJd5kjAq37Zep1CEgaYmrH9Q3GwPiB9cHyd1Y1UwggGhJGoxipbzg==",
      "dev": true,
      "requires": {
        "camelcase": "^5.0.0",
        "decamelize": "^1.2.0"
      }
    },
    "yauzl": {
      "version": "2.10.0",
      "resolved": "https://registry.npmjs.org/yauzl/-/yauzl-2.10.0.tgz",
      "integrity": "sha1-x+sXyT4RLLEIb6bY5R+wZnt5pfk=",
      "dev": true,
      "requires": {
        "buffer-crc32": "~0.2.3",
        "fd-slicer": "~1.1.0"
      }
    },
    "yeast": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/yeast/-/yeast-0.1.2.tgz",
      "integrity": "sha512-8HFIh676uyGYP6wP13R/j6OJ/1HwJ46snpvzE7aHAN3Ryqh2yX6Xox2B4CUmTwwOIzlG3Bs7ocsP5dZH/R1Qbg=="
    }
  }
}
