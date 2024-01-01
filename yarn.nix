{ fetchurl, fetchgit, linkFarm, runCommand, gnutar }: rec {
  offline_cache = linkFarm "offline" packages;
  packages = [
    {
      name = "_mongodb_js_saslprep___saslprep_1.1.1.tgz";
      path = fetchurl {
        name = "_mongodb_js_saslprep___saslprep_1.1.1.tgz";
        url  = "https://registry.yarnpkg.com/@mongodb-js/saslprep/-/saslprep-1.1.1.tgz";
        sha512 = "t7c5K033joZZMspnHg/gWPE4kandgc2OxE74aYOtGKfgB9VPuVJPix0H6fhmm2erj5PBJ21mqcx34lpIGtUCsQ==";
      };
    }
    {
      name = "_types_node___node_20.10.6.tgz";
      path = fetchurl {
        name = "_types_node___node_20.10.6.tgz";
        url  = "https://registry.yarnpkg.com/@types/node/-/node-20.10.6.tgz";
        sha512 = "Vac8H+NlRNNlAmDfGUP7b5h/KA+AtWIzuXy0E6OyP8f1tCLYAtPvKRRDJjAPqhpCb0t6U2j7/xqAuLEebW2kiw==";
      };
    }
    {
      name = "_types_webidl_conversions___webidl_conversions_7.0.3.tgz";
      path = fetchurl {
        name = "_types_webidl_conversions___webidl_conversions_7.0.3.tgz";
        url  = "https://registry.yarnpkg.com/@types/webidl-conversions/-/webidl-conversions-7.0.3.tgz";
        sha512 = "CiJJvcRtIgzadHCYXw7dqEnMNRjhGZlYK05Mj9OyktqV8uVT8fD2BFOB7S1uwBE3Kj2Z+4UyPmFw/Ixgw/LAlA==";
      };
    }
    {
      name = "_types_whatwg_url___whatwg_url_8.2.2.tgz";
      path = fetchurl {
        name = "_types_whatwg_url___whatwg_url_8.2.2.tgz";
        url  = "https://registry.yarnpkg.com/@types/whatwg-url/-/whatwg-url-8.2.2.tgz";
        sha512 = "FtQu10RWgn3D9U4aazdwIE2yzphmTJREDqNdODHrbrZmmMqI0vMheC/6NE/J1Yveaj8H+ela+YwWTjq5PGmuhA==";
      };
    }
    {
      name = "accepts___accepts_1.3.8.tgz";
      path = fetchurl {
        name = "accepts___accepts_1.3.8.tgz";
        url  = "https://registry.yarnpkg.com/accepts/-/accepts-1.3.8.tgz";
        sha512 = "PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==";
      };
    }
    {
      name = "ansi_styles___ansi_styles_4.3.0.tgz";
      path = fetchurl {
        name = "ansi_styles___ansi_styles_4.3.0.tgz";
        url  = "https://registry.yarnpkg.com/ansi-styles/-/ansi-styles-4.3.0.tgz";
        sha512 = "zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==";
      };
    }
    {
      name = "argparse___argparse_2.0.1.tgz";
      path = fetchurl {
        name = "argparse___argparse_2.0.1.tgz";
        url  = "https://registry.yarnpkg.com/argparse/-/argparse-2.0.1.tgz";
        sha512 = "8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==";
      };
    }
    {
      name = "array_flatten___array_flatten_1.1.1.tgz";
      path = fetchurl {
        name = "array_flatten___array_flatten_1.1.1.tgz";
        url  = "https://registry.yarnpkg.com/array-flatten/-/array-flatten-1.1.1.tgz";
        sha512 = "PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==";
      };
    }
    {
      name = "async___async_3.2.5.tgz";
      path = fetchurl {
        name = "async___async_3.2.5.tgz";
        url  = "https://registry.yarnpkg.com/async/-/async-3.2.5.tgz";
        sha512 = "baNZyqaaLhyLVKm/DlvdW051MSgO6b8eVfIezl9E5PqWxFgzLm/wQntEW4zOytVburDEr0JlALEpdOFwvErLsg==";
      };
    }
    {
      name = "balanced_match___balanced_match_1.0.2.tgz";
      path = fetchurl {
        name = "balanced_match___balanced_match_1.0.2.tgz";
        url  = "https://registry.yarnpkg.com/balanced-match/-/balanced-match-1.0.2.tgz";
        sha512 = "3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==";
      };
    }
    {
      name = "body_parser___body_parser_1.20.1.tgz";
      path = fetchurl {
        name = "body_parser___body_parser_1.20.1.tgz";
        url  = "https://registry.yarnpkg.com/body-parser/-/body-parser-1.20.1.tgz";
        sha512 = "jWi7abTbYwajOytWCQc37VulmWiRae5RyTpaCyDcS5/lMdtwSz5lOpDE67srw/HYe35f1z3fDQw+3txg7gNtWw==";
      };
    }
    {
      name = "brace_expansion___brace_expansion_1.1.11.tgz";
      path = fetchurl {
        name = "brace_expansion___brace_expansion_1.1.11.tgz";
        url  = "https://registry.yarnpkg.com/brace-expansion/-/brace-expansion-1.1.11.tgz";
        sha512 = "iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==";
      };
    }
    {
      name = "brace_expansion___brace_expansion_2.0.1.tgz";
      path = fetchurl {
        name = "brace_expansion___brace_expansion_2.0.1.tgz";
        url  = "https://registry.yarnpkg.com/brace-expansion/-/brace-expansion-2.0.1.tgz";
        sha512 = "XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==";
      };
    }
    {
      name = "bson___bson_5.5.1.tgz";
      path = fetchurl {
        name = "bson___bson_5.5.1.tgz";
        url  = "https://registry.yarnpkg.com/bson/-/bson-5.5.1.tgz";
        sha512 = "ix0EwukN2EpC0SRWIj/7B5+A6uQMQy6KMREI9qQqvgpkV2frH63T0UDVd1SYedL6dNCmDBYB3QtXi4ISk9YT+g==";
      };
    }
    {
      name = "bytes___bytes_3.1.2.tgz";
      path = fetchurl {
        name = "bytes___bytes_3.1.2.tgz";
        url  = "https://registry.yarnpkg.com/bytes/-/bytes-3.1.2.tgz";
        sha512 = "/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==";
      };
    }
    {
      name = "call_bind___call_bind_1.0.5.tgz";
      path = fetchurl {
        name = "call_bind___call_bind_1.0.5.tgz";
        url  = "https://registry.yarnpkg.com/call-bind/-/call-bind-1.0.5.tgz";
        sha512 = "C3nQxfFZxFRVoJoGKKI8y3MOEo129NQ+FgQ08iye+Mk4zNZZGdjfs06bVTr+DBSlA66Q2VEcMki/cUCP4SercQ==";
      };
    }
    {
      name = "chalk___chalk_4.1.2.tgz";
      path = fetchurl {
        name = "chalk___chalk_4.1.2.tgz";
        url  = "https://registry.yarnpkg.com/chalk/-/chalk-4.1.2.tgz";
        sha512 = "oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==";
      };
    }
    {
      name = "color_convert___color_convert_2.0.1.tgz";
      path = fetchurl {
        name = "color_convert___color_convert_2.0.1.tgz";
        url  = "https://registry.yarnpkg.com/color-convert/-/color-convert-2.0.1.tgz";
        sha512 = "RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==";
      };
    }
    {
      name = "color_name___color_name_1.1.4.tgz";
      path = fetchurl {
        name = "color_name___color_name_1.1.4.tgz";
        url  = "https://registry.yarnpkg.com/color-name/-/color-name-1.1.4.tgz";
        sha512 = "dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==";
      };
    }
    {
      name = "concat_map___concat_map_0.0.1.tgz";
      path = fetchurl {
        name = "concat_map___concat_map_0.0.1.tgz";
        url  = "https://registry.yarnpkg.com/concat-map/-/concat-map-0.0.1.tgz";
        sha512 = "/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==";
      };
    }
    {
      name = "content_disposition___content_disposition_0.5.4.tgz";
      path = fetchurl {
        name = "content_disposition___content_disposition_0.5.4.tgz";
        url  = "https://registry.yarnpkg.com/content-disposition/-/content-disposition-0.5.4.tgz";
        sha512 = "FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==";
      };
    }
    {
      name = "content_type___content_type_1.0.5.tgz";
      path = fetchurl {
        name = "content_type___content_type_1.0.5.tgz";
        url  = "https://registry.yarnpkg.com/content-type/-/content-type-1.0.5.tgz";
        sha512 = "nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==";
      };
    }
    {
      name = "cookie_signature___cookie_signature_1.0.6.tgz";
      path = fetchurl {
        name = "cookie_signature___cookie_signature_1.0.6.tgz";
        url  = "https://registry.yarnpkg.com/cookie-signature/-/cookie-signature-1.0.6.tgz";
        sha512 = "QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==";
      };
    }
    {
      name = "cookie___cookie_0.5.0.tgz";
      path = fetchurl {
        name = "cookie___cookie_0.5.0.tgz";
        url  = "https://registry.yarnpkg.com/cookie/-/cookie-0.5.0.tgz";
        sha512 = "YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw==";
      };
    }
    {
      name = "cors___cors_2.8.5.tgz";
      path = fetchurl {
        name = "cors___cors_2.8.5.tgz";
        url  = "https://registry.yarnpkg.com/cors/-/cors-2.8.5.tgz";
        sha512 = "KIHbLJqu73RGr/hnbrO9uBeixNGuvSQjul/jdFvS/KFSIH1hWVd1ng7zOHx+YrEfInLG7q4n6GHQ9cDtxv/P6g==";
      };
    }
    {
      name = "debug___debug_2.6.9.tgz";
      path = fetchurl {
        name = "debug___debug_2.6.9.tgz";
        url  = "https://registry.yarnpkg.com/debug/-/debug-2.6.9.tgz";
        sha512 = "bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==";
      };
    }
    {
      name = "debug___debug_4.3.4.tgz";
      path = fetchurl {
        name = "debug___debug_4.3.4.tgz";
        url  = "https://registry.yarnpkg.com/debug/-/debug-4.3.4.tgz";
        sha512 = "PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==";
      };
    }
    {
      name = "define_data_property___define_data_property_1.1.1.tgz";
      path = fetchurl {
        name = "define_data_property___define_data_property_1.1.1.tgz";
        url  = "https://registry.yarnpkg.com/define-data-property/-/define-data-property-1.1.1.tgz";
        sha512 = "E7uGkTzkk1d0ByLeSc6ZsFS79Axg+m1P/VsgYsxHgiuc3tFSj+MjMIwe90FC4lOAZzNBdY7kkO2P2wKdsQ1vgQ==";
      };
    }
    {
      name = "depd___depd_2.0.0.tgz";
      path = fetchurl {
        name = "depd___depd_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/depd/-/depd-2.0.0.tgz";
        sha512 = "g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==";
      };
    }
    {
      name = "destroy___destroy_1.2.0.tgz";
      path = fetchurl {
        name = "destroy___destroy_1.2.0.tgz";
        url  = "https://registry.yarnpkg.com/destroy/-/destroy-1.2.0.tgz";
        sha512 = "2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==";
      };
    }
    {
      name = "ee_first___ee_first_1.1.1.tgz";
      path = fetchurl {
        name = "ee_first___ee_first_1.1.1.tgz";
        url  = "https://registry.yarnpkg.com/ee-first/-/ee-first-1.1.1.tgz";
        sha512 = "WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==";
      };
    }
    {
      name = "ejs___ejs_3.1.9.tgz";
      path = fetchurl {
        name = "ejs___ejs_3.1.9.tgz";
        url  = "https://registry.yarnpkg.com/ejs/-/ejs-3.1.9.tgz";
        sha512 = "rC+QVNMJWv+MtPgkt0y+0rVEIdbtxVADApW9JXrUVlzHetgcyczP/E7DJmWJ4fJCZF2cPcBk0laWO9ZHMG3DmQ==";
      };
    }
    {
      name = "encodeurl___encodeurl_1.0.2.tgz";
      path = fetchurl {
        name = "encodeurl___encodeurl_1.0.2.tgz";
        url  = "https://registry.yarnpkg.com/encodeurl/-/encodeurl-1.0.2.tgz";
        sha512 = "TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==";
      };
    }
    {
      name = "entities___entities_3.0.1.tgz";
      path = fetchurl {
        name = "entities___entities_3.0.1.tgz";
        url  = "https://registry.yarnpkg.com/entities/-/entities-3.0.1.tgz";
        sha512 = "WiyBqoomrwMdFG1e0kqvASYfnlb0lp8M5o5Fw2OFq1hNZxxcNk8Ik0Xm7LxzBhuidnZB/UtBqVCgUz3kBOP51Q==";
      };
    }
    {
      name = "escape_html___escape_html_1.0.3.tgz";
      path = fetchurl {
        name = "escape_html___escape_html_1.0.3.tgz";
        url  = "https://registry.yarnpkg.com/escape-html/-/escape-html-1.0.3.tgz";
        sha512 = "NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==";
      };
    }
    {
      name = "etag___etag_1.8.1.tgz";
      path = fetchurl {
        name = "etag___etag_1.8.1.tgz";
        url  = "https://registry.yarnpkg.com/etag/-/etag-1.8.1.tgz";
        sha512 = "aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==";
      };
    }
    {
      name = "express___express_4.18.2.tgz";
      path = fetchurl {
        name = "express___express_4.18.2.tgz";
        url  = "https://registry.yarnpkg.com/express/-/express-4.18.2.tgz";
        sha512 = "5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ==";
      };
    }
    {
      name = "filelist___filelist_1.0.4.tgz";
      path = fetchurl {
        name = "filelist___filelist_1.0.4.tgz";
        url  = "https://registry.yarnpkg.com/filelist/-/filelist-1.0.4.tgz";
        sha512 = "w1cEuf3S+DrLCQL7ET6kz+gmlJdbq9J7yXCSjK/OZCPA+qEN1WyF4ZAf0YYJa4/shHJra2t/d/r8SV4Ji+x+8Q==";
      };
    }
    {
      name = "finalhandler___finalhandler_1.2.0.tgz";
      path = fetchurl {
        name = "finalhandler___finalhandler_1.2.0.tgz";
        url  = "https://registry.yarnpkg.com/finalhandler/-/finalhandler-1.2.0.tgz";
        sha512 = "5uXcUVftlQMFnWC9qu/svkWv3GTd2PfUhK/3PLkYNAe7FbqJMt3515HaxE6eRL74GdsriiwujiawdaB1BpEISg==";
      };
    }
    {
      name = "forwarded___forwarded_0.2.0.tgz";
      path = fetchurl {
        name = "forwarded___forwarded_0.2.0.tgz";
        url  = "https://registry.yarnpkg.com/forwarded/-/forwarded-0.2.0.tgz";
        sha512 = "buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==";
      };
    }
    {
      name = "fresh___fresh_0.5.2.tgz";
      path = fetchurl {
        name = "fresh___fresh_0.5.2.tgz";
        url  = "https://registry.yarnpkg.com/fresh/-/fresh-0.5.2.tgz";
        sha512 = "zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==";
      };
    }
    {
      name = "fs___fs_0.0.1_security.tgz";
      path = fetchurl {
        name = "fs___fs_0.0.1_security.tgz";
        url  = "https://registry.yarnpkg.com/fs/-/fs-0.0.1-security.tgz";
        sha512 = "3XY9e1pP0CVEUCdj5BmfIZxRBTSDycnbqhIOGec9QYtmVH2fbLpj86CFWkrNOkt/Fvty4KZG5lTglL9j/gJ87w==";
      };
    }
    {
      name = "function_bind___function_bind_1.1.2.tgz";
      path = fetchurl {
        name = "function_bind___function_bind_1.1.2.tgz";
        url  = "https://registry.yarnpkg.com/function-bind/-/function-bind-1.1.2.tgz";
        sha512 = "7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==";
      };
    }
    {
      name = "get_intrinsic___get_intrinsic_1.2.2.tgz";
      path = fetchurl {
        name = "get_intrinsic___get_intrinsic_1.2.2.tgz";
        url  = "https://registry.yarnpkg.com/get-intrinsic/-/get-intrinsic-1.2.2.tgz";
        sha512 = "0gSo4ml/0j98Y3lngkFEot/zhiCeWsbYIlZ+uZOVgzLyLaUw7wxUL+nCTP0XJvJg1AXulJRI3UJi8GsbDuxdGA==";
      };
    }
    {
      name = "glur___glur_1.1.2.tgz";
      path = fetchurl {
        name = "glur___glur_1.1.2.tgz";
        url  = "https://registry.yarnpkg.com/glur/-/glur-1.1.2.tgz";
        sha512 = "l+8esYHTKOx2G/Aao4lEQ0bnHWg4fWtJbVoZZT9Knxi01pB8C80BR85nONLFwkkQoFRCmXY+BUcGZN3yZ2QsRA==";
      };
    }
    {
      name = "gopd___gopd_1.0.1.tgz";
      path = fetchurl {
        name = "gopd___gopd_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/gopd/-/gopd-1.0.1.tgz";
        sha512 = "d65bNlIadxvpb/A2abVdlqKqV563juRnZ1Wtk6s1sIR8uNsXR70xqIzVqxVf1eTqDunwT2MkczEeaezCKTZhwA==";
      };
    }
    {
      name = "has_flag___has_flag_4.0.0.tgz";
      path = fetchurl {
        name = "has_flag___has_flag_4.0.0.tgz";
        url  = "https://registry.yarnpkg.com/has-flag/-/has-flag-4.0.0.tgz";
        sha512 = "EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==";
      };
    }
    {
      name = "has_property_descriptors___has_property_descriptors_1.0.1.tgz";
      path = fetchurl {
        name = "has_property_descriptors___has_property_descriptors_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/has-property-descriptors/-/has-property-descriptors-1.0.1.tgz";
        sha512 = "VsX8eaIewvas0xnvinAe9bw4WfIeODpGYikiWYLH+dma0Jw6KHYqWiWfhQlgOVK8D6PvjubK5Uc4P0iIhIcNVg==";
      };
    }
    {
      name = "has_proto___has_proto_1.0.1.tgz";
      path = fetchurl {
        name = "has_proto___has_proto_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/has-proto/-/has-proto-1.0.1.tgz";
        sha512 = "7qE+iP+O+bgF9clE5+UoBFzE65mlBiVj3tKCrlNQ0Ogwm0BjpT/gK4SlLYDMybDh5I3TCTKnPPa0oMG7JDYrhg==";
      };
    }
    {
      name = "has_symbols___has_symbols_1.0.3.tgz";
      path = fetchurl {
        name = "has_symbols___has_symbols_1.0.3.tgz";
        url  = "https://registry.yarnpkg.com/has-symbols/-/has-symbols-1.0.3.tgz";
        sha512 = "l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A==";
      };
    }
    {
      name = "hasown___hasown_2.0.0.tgz";
      path = fetchurl {
        name = "hasown___hasown_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/hasown/-/hasown-2.0.0.tgz";
        sha512 = "vUptKVTpIJhcczKBbgnS+RtcuYMB8+oNzPK2/Hp3hanz8JmpATdmmgLgSaadVREkDm+e2giHwY3ZRkyjSIDDFA==";
      };
    }
    {
      name = "highlight.js___highlight.js_11.9.0.tgz";
      path = fetchurl {
        name = "highlight.js___highlight.js_11.9.0.tgz";
        url  = "https://registry.yarnpkg.com/highlight.js/-/highlight.js-11.9.0.tgz";
        sha512 = "fJ7cW7fQGCYAkgv4CPfwFHrfd/cLS4Hau96JuJ+ZTOWhjnhoeN1ub1tFmALm/+lW5z4WCAuAV9bm05AP0mS6Gw==";
      };
    }
    {
      name = "http_errors___http_errors_2.0.0.tgz";
      path = fetchurl {
        name = "http_errors___http_errors_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/http-errors/-/http-errors-2.0.0.tgz";
        sha512 = "FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==";
      };
    }
    {
      name = "iconv_lite___iconv_lite_0.4.24.tgz";
      path = fetchurl {
        name = "iconv_lite___iconv_lite_0.4.24.tgz";
        url  = "https://registry.yarnpkg.com/iconv-lite/-/iconv-lite-0.4.24.tgz";
        sha512 = "v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==";
      };
    }
    {
      name = "inherits___inherits_2.0.3.tgz";
      path = fetchurl {
        name = "inherits___inherits_2.0.3.tgz";
        url  = "https://registry.yarnpkg.com/inherits/-/inherits-2.0.3.tgz";
        sha512 = "x00IRNXNy63jwGkJmzPigoySHbaqpNuzKbBOmzK+g2OdZpQ9w+sxCN+VSB3ja7IAge2OP2qpfxTjeNcyjmW1uw==";
      };
    }
    {
      name = "inherits___inherits_2.0.4.tgz";
      path = fetchurl {
        name = "inherits___inherits_2.0.4.tgz";
        url  = "https://registry.yarnpkg.com/inherits/-/inherits-2.0.4.tgz";
        sha512 = "k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==";
      };
    }
    {
      name = "ip___ip_2.0.0.tgz";
      path = fetchurl {
        name = "ip___ip_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/ip/-/ip-2.0.0.tgz";
        sha512 = "WKa+XuLG1A1R0UWhl2+1XQSi+fZWMsYKffMZTTYsiZaUD8k2yDAj5atimTUD2TZkyCkNEeYE5NhFZmupOGtjYQ==";
      };
    }
    {
      name = "ipaddr.js___ipaddr.js_1.9.1.tgz";
      path = fetchurl {
        name = "ipaddr.js___ipaddr.js_1.9.1.tgz";
        url  = "https://registry.yarnpkg.com/ipaddr.js/-/ipaddr.js-1.9.1.tgz";
        sha512 = "0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==";
      };
    }
    {
      name = "jake___jake_10.8.7.tgz";
      path = fetchurl {
        name = "jake___jake_10.8.7.tgz";
        url  = "https://registry.yarnpkg.com/jake/-/jake-10.8.7.tgz";
        sha512 = "ZDi3aP+fG/LchyBzUM804VjddnwfSfsdeYkwt8NcbKRvo4rFkjhs456iLFn3k2ZUWvNe4i48WACDbza8fhq2+w==";
      };
    }
    {
      name = "kareem___kareem_2.5.1.tgz";
      path = fetchurl {
        name = "kareem___kareem_2.5.1.tgz";
        url  = "https://registry.yarnpkg.com/kareem/-/kareem-2.5.1.tgz";
        sha512 = "7jFxRVm+jD+rkq3kY0iZDJfsO2/t4BBPeEb2qKn2lR/9KhuksYk5hxzfRYWMPV8P/x2d0kHD306YyWLzjjH+uA==";
      };
    }
    {
      name = "linkify_it___linkify_it_4.0.1.tgz";
      path = fetchurl {
        name = "linkify_it___linkify_it_4.0.1.tgz";
        url  = "https://registry.yarnpkg.com/linkify-it/-/linkify-it-4.0.1.tgz";
        sha512 = "C7bfi1UZmoj8+PQx22XyeXCuBlokoyWQL5pWSP+EI6nzRylyThouddufc2c1NDIcP9k5agmN9fLpA7VNJfIiqw==";
      };
    }
    {
      name = "markdown_it_abbr___markdown_it_abbr_1.0.4.tgz";
      path = fetchurl {
        name = "markdown_it_abbr___markdown_it_abbr_1.0.4.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-abbr/-/markdown-it-abbr-1.0.4.tgz";
        sha512 = "ZeA4Z4SaBbYysZap5iZcxKmlPL6bYA8grqhzJIHB1ikn7njnzaP8uwbtuXc4YXD5LicI4/2Xmc0VwmSiFV04gg==";
      };
    }
    {
      name = "markdown_it_collapsible___markdown_it_collapsible_2.0.0.tgz";
      path = fetchurl {
        name = "markdown_it_collapsible___markdown_it_collapsible_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-collapsible/-/markdown-it-collapsible-2.0.0.tgz";
        sha512 = "U7wvOnCccw5ssY2pLK0H3HdcJxe39jKSqmnV9khUJ6e1z046u2cCSTo06b3yEK8pGYe0b3R1lwvfX7CdQuAK7g==";
      };
    }
    {
      name = "markdown_it_container___markdown_it_container_3.0.0.tgz";
      path = fetchurl {
        name = "markdown_it_container___markdown_it_container_3.0.0.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-container/-/markdown-it-container-3.0.0.tgz";
        sha512 = "y6oKTq4BB9OQuY/KLfk/O3ysFhB3IMYoIWhGJEidXt1NQFocFK2sA2t0NYZAMyMShAGL6x5OPIbrmXPIqaN9rw==";
      };
    }
    {
      name = "markdown_it_deflist___markdown_it_deflist_2.1.0.tgz";
      path = fetchurl {
        name = "markdown_it_deflist___markdown_it_deflist_2.1.0.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-deflist/-/markdown-it-deflist-2.1.0.tgz";
        sha512 = "3OuqoRUlSxJiuQYu0cWTLHNhhq2xtoSFqsZK8plANg91+RJQU1ziQ6lA2LzmFAEes18uPBsHZpcX6We5l76Nzg==";
      };
    }
    {
      name = "markdown_it_emoji___markdown_it_emoji_2.0.2.tgz";
      path = fetchurl {
        name = "markdown_it_emoji___markdown_it_emoji_2.0.2.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-emoji/-/markdown-it-emoji-2.0.2.tgz";
        sha512 = "zLftSaNrKuYl0kR5zm4gxXjHaOI3FAOEaloKmRA5hijmJZvSjmxcokOLlzycb/HXlUFWzXqpIEoyEMCE4i9MvQ==";
      };
    }
    {
      name = "markdown_it_expandable___markdown_it_expandable_1.0.2.tgz";
      path = fetchurl {
        name = "markdown_it_expandable___markdown_it_expandable_1.0.2.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-expandable/-/markdown-it-expandable-1.0.2.tgz";
        sha512 = "DX/WqnV0O9abfD8cdnKQLpYrerB3NGr2FjLa3FL/Ha1v9m71C6bMuPE1bbv7eVIamo0PGXzpxEjoohJA3DPttw==";
      };
    }
    {
      name = "markdown_it_footnote___markdown_it_footnote_3.0.3.tgz";
      path = fetchurl {
        name = "markdown_it_footnote___markdown_it_footnote_3.0.3.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-footnote/-/markdown-it-footnote-3.0.3.tgz";
        sha512 = "YZMSuCGVZAjzKMn+xqIco9d1cLGxbELHZ9do/TSYVzraooV8ypsppKNmUJ0fVH5ljkCInQAtFpm8Rb3eXSrt5w==";
      };
    }
    {
      name = "markdown_it_highlightjs___markdown_it_highlightjs_4.0.1.tgz";
      path = fetchurl {
        name = "markdown_it_highlightjs___markdown_it_highlightjs_4.0.1.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-highlightjs/-/markdown-it-highlightjs-4.0.1.tgz";
        sha512 = "EPXwFEN6P5nqR3G4KjT20r20xbGYKMMA/360hhSYFmeoGXTE6hsLtJAiB/8ID8slVH4CWHHEL7GX0YenyIstVQ==";
      };
    }
    {
      name = "markdown_it_ins___markdown_it_ins_3.0.1.tgz";
      path = fetchurl {
        name = "markdown_it_ins___markdown_it_ins_3.0.1.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-ins/-/markdown-it-ins-3.0.1.tgz";
        sha512 = "32SSfZqSzqyAmmQ4SHvhxbFqSzPDqsZgMHDwxqPzp+v+t8RsmqsBZRG+RfRQskJko9PfKC2/oxyOs4Yg/CfiRw==";
      };
    }
    {
      name = "markdown_it_mark___markdown_it_mark_3.0.1.tgz";
      path = fetchurl {
        name = "markdown_it_mark___markdown_it_mark_3.0.1.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-mark/-/markdown-it-mark-3.0.1.tgz";
        sha512 = "HyxjAu6BRsdt6Xcv6TKVQnkz/E70TdGXEFHRYBGLncRE9lBFwDNLVtFojKxjJWgJ+5XxUwLaHXy+2sGBbDn+4A==";
      };
    }
    {
      name = "markdown_it_sub___markdown_it_sub_1.0.0.tgz";
      path = fetchurl {
        name = "markdown_it_sub___markdown_it_sub_1.0.0.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it-sub/-/markdown-it-sub-1.0.0.tgz";
        sha512 = "z2Rm/LzEE1wzwTSDrI+FlPEveAAbgdAdPhdWarq/ZGJrGW/uCQbKAnhoCsE4hAbc3SEym26+W2z/VQB0cQiA9Q==";
      };
    }
    {
      name = "markdown_it___markdown_it_13.0.2.tgz";
      path = fetchurl {
        name = "markdown_it___markdown_it_13.0.2.tgz";
        url  = "https://registry.yarnpkg.com/markdown-it/-/markdown-it-13.0.2.tgz";
        sha512 = "FtwnEuuK+2yVU7goGn/MJ0WBZMM9ZPgU9spqlFs7/A/pDIUNSOQZhUgOqYCficIuR2QaFnrt8LHqBWsbTAoI5w==";
      };
    }
    {
      name = "mdurl___mdurl_1.0.1.tgz";
      path = fetchurl {
        name = "mdurl___mdurl_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/mdurl/-/mdurl-1.0.1.tgz";
        sha512 = "/sKlQJCBYVY9Ers9hqzKou4H6V5UWc/M59TH2dvkt+84itfnq7uFOMLpOiOS4ujvHP4etln18fmIxA5R5fll0g==";
      };
    }
    {
      name = "media_typer___media_typer_0.3.0.tgz";
      path = fetchurl {
        name = "media_typer___media_typer_0.3.0.tgz";
        url  = "https://registry.yarnpkg.com/media-typer/-/media-typer-0.3.0.tgz";
        sha512 = "dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==";
      };
    }
    {
      name = "memory_pager___memory_pager_1.5.0.tgz";
      path = fetchurl {
        name = "memory_pager___memory_pager_1.5.0.tgz";
        url  = "https://registry.yarnpkg.com/memory-pager/-/memory-pager-1.5.0.tgz";
        sha512 = "ZS4Bp4r/Zoeq6+NLJpP+0Zzm0pR8whtGPf1XExKLJBAczGMnSi3It14OiNCStjQjM6NU1okjQGSxgEZN8eBYKg==";
      };
    }
    {
      name = "merge_descriptors___merge_descriptors_1.0.1.tgz";
      path = fetchurl {
        name = "merge_descriptors___merge_descriptors_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/merge-descriptors/-/merge-descriptors-1.0.1.tgz";
        sha512 = "cCi6g3/Zr1iqQi6ySbseM1Xvooa98N0w31jzUYrXPX2xqObmFGHJ0tQ5u74H3mVh7wLouTseZyYIq39g8cNp1w==";
      };
    }
    {
      name = "methods___methods_1.1.2.tgz";
      path = fetchurl {
        name = "methods___methods_1.1.2.tgz";
        url  = "https://registry.yarnpkg.com/methods/-/methods-1.1.2.tgz";
        sha512 = "iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==";
      };
    }
    {
      name = "mime_db___mime_db_1.52.0.tgz";
      path = fetchurl {
        name = "mime_db___mime_db_1.52.0.tgz";
        url  = "https://registry.yarnpkg.com/mime-db/-/mime-db-1.52.0.tgz";
        sha512 = "sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==";
      };
    }
    {
      name = "mime_types___mime_types_2.1.35.tgz";
      path = fetchurl {
        name = "mime_types___mime_types_2.1.35.tgz";
        url  = "https://registry.yarnpkg.com/mime-types/-/mime-types-2.1.35.tgz";
        sha512 = "ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==";
      };
    }
    {
      name = "mime___mime_1.6.0.tgz";
      path = fetchurl {
        name = "mime___mime_1.6.0.tgz";
        url  = "https://registry.yarnpkg.com/mime/-/mime-1.6.0.tgz";
        sha512 = "x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==";
      };
    }
    {
      name = "minimatch___minimatch_3.1.2.tgz";
      path = fetchurl {
        name = "minimatch___minimatch_3.1.2.tgz";
        url  = "https://registry.yarnpkg.com/minimatch/-/minimatch-3.1.2.tgz";
        sha512 = "J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==";
      };
    }
    {
      name = "minimatch___minimatch_5.1.6.tgz";
      path = fetchurl {
        name = "minimatch___minimatch_5.1.6.tgz";
        url  = "https://registry.yarnpkg.com/minimatch/-/minimatch-5.1.6.tgz";
        sha512 = "lKwV/1brpG6mBUFHtb7NUmtABCb2WZZmm2wNiOA5hAb8VdCS4B3dtMWyvcoViccwAW/COERjXLt0zP1zXUN26g==";
      };
    }
    {
      name = "mongodb_connection_string_url___mongodb_connection_string_url_2.6.0.tgz";
      path = fetchurl {
        name = "mongodb_connection_string_url___mongodb_connection_string_url_2.6.0.tgz";
        url  = "https://registry.yarnpkg.com/mongodb-connection-string-url/-/mongodb-connection-string-url-2.6.0.tgz";
        sha512 = "WvTZlI9ab0QYtTYnuMLgobULWhokRjtC7db9LtcVfJ+Hsnyr5eo6ZtNAt3Ly24XZScGMelOcGtm7lSn0332tPQ==";
      };
    }
    {
      name = "mongodb___mongodb_5.9.1.tgz";
      path = fetchurl {
        name = "mongodb___mongodb_5.9.1.tgz";
        url  = "https://registry.yarnpkg.com/mongodb/-/mongodb-5.9.1.tgz";
        sha512 = "NBGA8AfJxGPeB12F73xXwozt8ZpeIPmCUeWRwl9xejozTXFes/3zaep9zhzs1B/nKKsw4P3I4iPfXl3K7s6g+Q==";
      };
    }
    {
      name = "mongoose___mongoose_7.6.7.tgz";
      path = fetchurl {
        name = "mongoose___mongoose_7.6.7.tgz";
        url  = "https://registry.yarnpkg.com/mongoose/-/mongoose-7.6.7.tgz";
        sha512 = "6Ihl7Y7OlSEMiwyjar3N8sMKRZa3LNGcayES8I+Hluo0sV6j1SVOo8MXXnwi+z3+Hcyk4zO47+xL87fBTNlWVw==";
      };
    }
    {
      name = "mpath___mpath_0.9.0.tgz";
      path = fetchurl {
        name = "mpath___mpath_0.9.0.tgz";
        url  = "https://registry.yarnpkg.com/mpath/-/mpath-0.9.0.tgz";
        sha512 = "ikJRQTk8hw5DEoFVxHG1Gn9T/xcjtdnOKIU1JTmGjZZlg9LST2mBLmcX3/ICIbgJydT2GOc15RnNy5mHmzfSew==";
      };
    }
    {
      name = "mquery___mquery_5.0.0.tgz";
      path = fetchurl {
        name = "mquery___mquery_5.0.0.tgz";
        url  = "https://registry.yarnpkg.com/mquery/-/mquery-5.0.0.tgz";
        sha512 = "iQMncpmEK8R8ncT8HJGsGc9Dsp8xcgYMVSbs5jgnm1lFHTZqMJTUWTDx1LBO8+mK3tPNZWFLBghQEIOULSTHZg==";
      };
    }
    {
      name = "ms___ms_2.0.0.tgz";
      path = fetchurl {
        name = "ms___ms_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/ms/-/ms-2.0.0.tgz";
        sha512 = "Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==";
      };
    }
    {
      name = "ms___ms_2.1.2.tgz";
      path = fetchurl {
        name = "ms___ms_2.1.2.tgz";
        url  = "https://registry.yarnpkg.com/ms/-/ms-2.1.2.tgz";
        sha512 = "sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==";
      };
    }
    {
      name = "ms___ms_2.1.3.tgz";
      path = fetchurl {
        name = "ms___ms_2.1.3.tgz";
        url  = "https://registry.yarnpkg.com/ms/-/ms-2.1.3.tgz";
        sha512 = "6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==";
      };
    }
    {
      name = "multimath___multimath_2.0.0.tgz";
      path = fetchurl {
        name = "multimath___multimath_2.0.0.tgz";
        url  = "https://registry.yarnpkg.com/multimath/-/multimath-2.0.0.tgz";
        sha512 = "toRx66cAMJ+Ccz7pMIg38xSIrtnbozk0dchXezwQDMgQmbGpfxjtv68H+L00iFL8hxDaVjrmwAFSb3I6bg8Q2g==";
      };
    }
    {
      name = "negotiator___negotiator_0.6.3.tgz";
      path = fetchurl {
        name = "negotiator___negotiator_0.6.3.tgz";
        url  = "https://registry.yarnpkg.com/negotiator/-/negotiator-0.6.3.tgz";
        sha512 = "+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==";
      };
    }
    {
      name = "object_assign___object_assign_4.1.1.tgz";
      path = fetchurl {
        name = "object_assign___object_assign_4.1.1.tgz";
        url  = "https://registry.yarnpkg.com/object-assign/-/object-assign-4.1.1.tgz";
        sha512 = "rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==";
      };
    }
    {
      name = "object_inspect___object_inspect_1.13.1.tgz";
      path = fetchurl {
        name = "object_inspect___object_inspect_1.13.1.tgz";
        url  = "https://registry.yarnpkg.com/object-inspect/-/object-inspect-1.13.1.tgz";
        sha512 = "5qoj1RUiKOMsCCNLV1CBiPYE10sziTsnmNxkAI/rZhiD63CF7IqdFGC/XzjWjpSgLf0LxXX3bDFIh0E18f6UhQ==";
      };
    }
    {
      name = "on_finished___on_finished_2.4.1.tgz";
      path = fetchurl {
        name = "on_finished___on_finished_2.4.1.tgz";
        url  = "https://registry.yarnpkg.com/on-finished/-/on-finished-2.4.1.tgz";
        sha512 = "oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==";
      };
    }
    {
      name = "parseurl___parseurl_1.3.3.tgz";
      path = fetchurl {
        name = "parseurl___parseurl_1.3.3.tgz";
        url  = "https://registry.yarnpkg.com/parseurl/-/parseurl-1.3.3.tgz";
        sha512 = "CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==";
      };
    }
    {
      name = "path_to_regexp___path_to_regexp_0.1.7.tgz";
      path = fetchurl {
        name = "path_to_regexp___path_to_regexp_0.1.7.tgz";
        url  = "https://registry.yarnpkg.com/path-to-regexp/-/path-to-regexp-0.1.7.tgz";
        sha512 = "5DFkuoqlv1uYQKxy8omFBeJPQcdoE07Kv2sferDCrAq1ohOU+MSDswDIbnx3YAM60qIOnYa53wBhXW0EbMonrQ==";
      };
    }
    {
      name = "path___path_0.12.7.tgz";
      path = fetchurl {
        name = "path___path_0.12.7.tgz";
        url  = "https://registry.yarnpkg.com/path/-/path-0.12.7.tgz";
        sha512 = "aXXC6s+1w7otVF9UletFkFcDsJeO7lSZBPUQhtb5O0xJe8LtYhj/GxldoL09bBj9+ZmE2hNoHqQSFMN5fikh4Q==";
      };
    }
    {
      name = "pica___pica_9.0.1.tgz";
      path = fetchurl {
        name = "pica___pica_9.0.1.tgz";
        url  = "https://registry.yarnpkg.com/pica/-/pica-9.0.1.tgz";
        sha512 = "v0U4vY6Z3ztz9b4jBIhCD3WYoecGXCQeCsYep+sXRefViL+mVVoTL+wqzdPeE+GpBFsRUtQZb6dltvAt2UkMtQ==";
      };
    }
    {
      name = "process___process_0.11.10.tgz";
      path = fetchurl {
        name = "process___process_0.11.10.tgz";
        url  = "https://registry.yarnpkg.com/process/-/process-0.11.10.tgz";
        sha512 = "cdGef/drWFoydD1JsMzuFf8100nZl+GT+yacc2bEced5f9Rjk4z+WtFUTBu9PhOi9j/jfmBPu0mMEY4wIdAF8A==";
      };
    }
    {
      name = "proxy_addr___proxy_addr_2.0.7.tgz";
      path = fetchurl {
        name = "proxy_addr___proxy_addr_2.0.7.tgz";
        url  = "https://registry.yarnpkg.com/proxy-addr/-/proxy-addr-2.0.7.tgz";
        sha512 = "llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==";
      };
    }
    {
      name = "punycode___punycode_2.3.1.tgz";
      path = fetchurl {
        name = "punycode___punycode_2.3.1.tgz";
        url  = "https://registry.yarnpkg.com/punycode/-/punycode-2.3.1.tgz";
        sha512 = "vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==";
      };
    }
    {
      name = "qs___qs_6.11.0.tgz";
      path = fetchurl {
        name = "qs___qs_6.11.0.tgz";
        url  = "https://registry.yarnpkg.com/qs/-/qs-6.11.0.tgz";
        sha512 = "MvjoMCJwEarSbUYk5O+nmoSzSutSsTwF85zcHPQ9OrlFoZOYIjaqBAJIqIXjptyD5vThxGq52Xu/MaJzRkIk4Q==";
      };
    }
    {
      name = "range_parser___range_parser_1.2.1.tgz";
      path = fetchurl {
        name = "range_parser___range_parser_1.2.1.tgz";
        url  = "https://registry.yarnpkg.com/range-parser/-/range-parser-1.2.1.tgz";
        sha512 = "Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==";
      };
    }
    {
      name = "raw_body___raw_body_2.5.1.tgz";
      path = fetchurl {
        name = "raw_body___raw_body_2.5.1.tgz";
        url  = "https://registry.yarnpkg.com/raw-body/-/raw-body-2.5.1.tgz";
        sha512 = "qqJBtEyVgS0ZmPGdCFPWJ3FreoqvG4MVQln/kCgF7Olq95IbOp0/BWyMwbdtn4VTvkM8Y7khCQ2Xgk/tcrCXig==";
      };
    }
    {
      name = "safe_buffer___safe_buffer_5.2.1.tgz";
      path = fetchurl {
        name = "safe_buffer___safe_buffer_5.2.1.tgz";
        url  = "https://registry.yarnpkg.com/safe-buffer/-/safe-buffer-5.2.1.tgz";
        sha512 = "rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==";
      };
    }
    {
      name = "safer_buffer___safer_buffer_2.1.2.tgz";
      path = fetchurl {
        name = "safer_buffer___safer_buffer_2.1.2.tgz";
        url  = "https://registry.yarnpkg.com/safer-buffer/-/safer-buffer-2.1.2.tgz";
        sha512 = "YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==";
      };
    }
    {
      name = "send___send_0.18.0.tgz";
      path = fetchurl {
        name = "send___send_0.18.0.tgz";
        url  = "https://registry.yarnpkg.com/send/-/send-0.18.0.tgz";
        sha512 = "qqWzuOjSFOuqPjFe4NOsMLafToQQwBSOEpS+FwEt3A2V3vKubTquT3vmLTQpFgMXp8AlFWFuP1qKaJZOtPpVXg==";
      };
    }
    {
      name = "serve_static___serve_static_1.15.0.tgz";
      path = fetchurl {
        name = "serve_static___serve_static_1.15.0.tgz";
        url  = "https://registry.yarnpkg.com/serve-static/-/serve-static-1.15.0.tgz";
        sha512 = "XGuRDNjXUijsUL0vl6nSD7cwURuzEgglbOaFuZM9g3kwDXOWVTck0jLzjPzGD+TazWbboZYu52/9/XPdUgne9g==";
      };
    }
    {
      name = "set_function_length___set_function_length_1.1.1.tgz";
      path = fetchurl {
        name = "set_function_length___set_function_length_1.1.1.tgz";
        url  = "https://registry.yarnpkg.com/set-function-length/-/set-function-length-1.1.1.tgz";
        sha512 = "VoaqjbBJKiWtg4yRcKBQ7g7wnGnLV3M8oLvVWwOk2PdYY6PEFegR1vezXR0tw6fZGF9csVakIRjrJiy2veSBFQ==";
      };
    }
    {
      name = "setprototypeof___setprototypeof_1.2.0.tgz";
      path = fetchurl {
        name = "setprototypeof___setprototypeof_1.2.0.tgz";
        url  = "https://registry.yarnpkg.com/setprototypeof/-/setprototypeof-1.2.0.tgz";
        sha512 = "E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==";
      };
    }
    {
      name = "side_channel___side_channel_1.0.4.tgz";
      path = fetchurl {
        name = "side_channel___side_channel_1.0.4.tgz";
        url  = "https://registry.yarnpkg.com/side-channel/-/side-channel-1.0.4.tgz";
        sha512 = "q5XPytqFEIKHkGdiMIrY10mvLRvnQh42/+GoBlFW3b2LXLE2xxJpZFdm94we0BaoV3RwJyGqg5wS7epxTv0Zvw==";
      };
    }
    {
      name = "sift___sift_16.0.1.tgz";
      path = fetchurl {
        name = "sift___sift_16.0.1.tgz";
        url  = "https://registry.yarnpkg.com/sift/-/sift-16.0.1.tgz";
        sha512 = "Wv6BjQ5zbhW7VFefWusVP33T/EM0vYikCaQ2qR8yULbsilAT8/wQaXvuQ3ptGLpoKx+lihJE3y2UTgKDyyNHZQ==";
      };
    }
    {
      name = "smart_buffer___smart_buffer_4.2.0.tgz";
      path = fetchurl {
        name = "smart_buffer___smart_buffer_4.2.0.tgz";
        url  = "https://registry.yarnpkg.com/smart-buffer/-/smart-buffer-4.2.0.tgz";
        sha512 = "94hK0Hh8rPqQl2xXc3HsaBoOXKV20MToPkcXvwbISWLEs+64sBq5kFgn2kJDHb1Pry9yrP0dxrCI9RRci7RXKg==";
      };
    }
    {
      name = "socks___socks_2.7.1.tgz";
      path = fetchurl {
        name = "socks___socks_2.7.1.tgz";
        url  = "https://registry.yarnpkg.com/socks/-/socks-2.7.1.tgz";
        sha512 = "7maUZy1N7uo6+WVEX6psASxtNlKaNVMlGQKkG/63nEDdLOWNbiUMoLK7X4uYoLhQstau72mLgfEWcXcwsaHbYQ==";
      };
    }
    {
      name = "sparse_bitfield___sparse_bitfield_3.0.3.tgz";
      path = fetchurl {
        name = "sparse_bitfield___sparse_bitfield_3.0.3.tgz";
        url  = "https://registry.yarnpkg.com/sparse-bitfield/-/sparse-bitfield-3.0.3.tgz";
        sha512 = "kvzhi7vqKTfkh0PZU+2D2PIllw2ymqJKujUcyPMd9Y75Nv4nPbGJZXNhxsgdQab2BmlDct1YnfQCguEvHr7VsQ==";
      };
    }
    {
      name = "statuses___statuses_2.0.1.tgz";
      path = fetchurl {
        name = "statuses___statuses_2.0.1.tgz";
        url  = "https://registry.yarnpkg.com/statuses/-/statuses-2.0.1.tgz";
        sha512 = "RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==";
      };
    }
    {
      name = "supports_color___supports_color_7.2.0.tgz";
      path = fetchurl {
        name = "supports_color___supports_color_7.2.0.tgz";
        url  = "https://registry.yarnpkg.com/supports-color/-/supports-color-7.2.0.tgz";
        sha512 = "qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==";
      };
    }
    {
      name = "toidentifier___toidentifier_1.0.1.tgz";
      path = fetchurl {
        name = "toidentifier___toidentifier_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/toidentifier/-/toidentifier-1.0.1.tgz";
        sha512 = "o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==";
      };
    }
    {
      name = "tr46___tr46_3.0.0.tgz";
      path = fetchurl {
        name = "tr46___tr46_3.0.0.tgz";
        url  = "https://registry.yarnpkg.com/tr46/-/tr46-3.0.0.tgz";
        sha512 = "l7FvfAHlcmulp8kr+flpQZmVwtu7nfRV7NZujtN0OqES8EL4O4e0qqzL0DC5gAvx/ZC/9lk6rhcUwYvkBnBnYA==";
      };
    }
    {
      name = "type_is___type_is_1.6.18.tgz";
      path = fetchurl {
        name = "type_is___type_is_1.6.18.tgz";
        url  = "https://registry.yarnpkg.com/type-is/-/type-is-1.6.18.tgz";
        sha512 = "TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==";
      };
    }
    {
      name = "uc.micro___uc.micro_1.0.6.tgz";
      path = fetchurl {
        name = "uc.micro___uc.micro_1.0.6.tgz";
        url  = "https://registry.yarnpkg.com/uc.micro/-/uc.micro-1.0.6.tgz";
        sha512 = "8Y75pvTYkLJW2hWQHXxoqRgV7qb9B+9vFEtidML+7koHUFapnVJAZ6cKs+Qjz5Aw3aZWHMC6u0wJE3At+nSGwA==";
      };
    }
    {
      name = "undici_types___undici_types_5.26.5.tgz";
      path = fetchurl {
        name = "undici_types___undici_types_5.26.5.tgz";
        url  = "https://registry.yarnpkg.com/undici-types/-/undici-types-5.26.5.tgz";
        sha512 = "JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==";
      };
    }
    {
      name = "unpipe___unpipe_1.0.0.tgz";
      path = fetchurl {
        name = "unpipe___unpipe_1.0.0.tgz";
        url  = "https://registry.yarnpkg.com/unpipe/-/unpipe-1.0.0.tgz";
        sha512 = "pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==";
      };
    }
    {
      name = "util___util_0.10.4.tgz";
      path = fetchurl {
        name = "util___util_0.10.4.tgz";
        url  = "https://registry.yarnpkg.com/util/-/util-0.10.4.tgz";
        sha512 = "0Pm9hTQ3se5ll1XihRic3FDIku70C+iHUdT/W926rSgHV5QgXsYbKZN8MSC3tJtSkhuROzvsQjAaFENRXr+19A==";
      };
    }
    {
      name = "utils_merge___utils_merge_1.0.1.tgz";
      path = fetchurl {
        name = "utils_merge___utils_merge_1.0.1.tgz";
        url  = "https://registry.yarnpkg.com/utils-merge/-/utils-merge-1.0.1.tgz";
        sha512 = "pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==";
      };
    }
    {
      name = "vary___vary_1.1.2.tgz";
      path = fetchurl {
        name = "vary___vary_1.1.2.tgz";
        url  = "https://registry.yarnpkg.com/vary/-/vary-1.1.2.tgz";
        sha512 = "BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==";
      };
    }
    {
      name = "webidl_conversions___webidl_conversions_7.0.0.tgz";
      path = fetchurl {
        name = "webidl_conversions___webidl_conversions_7.0.0.tgz";
        url  = "https://registry.yarnpkg.com/webidl-conversions/-/webidl-conversions-7.0.0.tgz";
        sha512 = "VwddBukDzu71offAQR975unBIGqfKZpM+8ZX6ySk8nYhVoo5CYaZyzt3YBvYtRtO+aoGlqxPg/B87NGVZ/fu6g==";
      };
    }
    {
      name = "webworkify___webworkify_1.5.0.tgz";
      path = fetchurl {
        name = "webworkify___webworkify_1.5.0.tgz";
        url  = "https://registry.yarnpkg.com/webworkify/-/webworkify-1.5.0.tgz";
        sha512 = "AMcUeyXAhbACL8S2hqqdqOLqvJ8ylmIbNwUIqQujRSouf4+eUFaXbG6F1Rbu+srlJMmxQWsiU7mOJi0nMBfM1g==";
      };
    }
    {
      name = "whatwg_url___whatwg_url_11.0.0.tgz";
      path = fetchurl {
        name = "whatwg_url___whatwg_url_11.0.0.tgz";
        url  = "https://registry.yarnpkg.com/whatwg-url/-/whatwg-url-11.0.0.tgz";
        sha512 = "RKT8HExMpoYx4igMiVMY83lN6UeITKJlBQ+vR/8ZJ8OCdSiN3RwCq+9gH0+Xzj0+5IrM6i4j/6LuvzbZIQgEcQ==";
      };
    }
  ];
}
