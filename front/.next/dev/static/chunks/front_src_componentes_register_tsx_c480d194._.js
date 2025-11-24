(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/front/src/componentes/register.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../assets/img/KINO.png'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/front/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Register() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "e8cd3ff4caff7b98f5aaaf9faf96637cc65c073bce70d2d4cb986616e81bfb41") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e8cd3ff4caff7b98f5aaaf9faf96637cc65c073bce70d2d4cb986616e81bfb41";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            nombre: "",
            email: "",
            password: "",
            direccion: ""
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const handleOnClick = _RegisterHandleOnClick;
    let t1;
    if ($[2] !== form) {
        t1 = ({
            "Register[handleChange]": (e)=>{
                setForm({
                    ...form,
                    [e.target.name]: e.target.value
                });
            }
        })["Register[handleChange]"];
        $[2] = form;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const handleChange = t1;
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "Register[handleSubmit]": (e_0)=>{
                e_0.preventDefault();
                setForm({
                    nombre: "",
                    email: "",
                    password: "",
                    direccion: ""
                });
            }
        })["Register[handleSubmit]"];
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const handleSubmit = t2;
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: KinoLogo,
            alt: "Kino Logo",
            width: 200,
            height: 100,
            priority: true,
            className: "mb-6"
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-center mb-4 text-white",
            children: "Registro"
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== form.nombre || $[8] !== handleChange) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            name: "nombre",
            placeholder: "Nombre",
            value: form.nombre,
            onChange: handleChange,
            className: "w-full p-2 rounded bg-[#3d3c3c] text-white",
            required: true
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[7] = form.nombre;
        $[8] = handleChange;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== form.email || $[11] !== handleChange) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "email",
            name: "email",
            placeholder: "Email",
            value: form.email,
            onChange: handleChange,
            className: "w-full p-2 rounded bg-[#3d3c3c] text-white",
            required: true
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[10] = form.email;
        $[11] = handleChange;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== form.password || $[14] !== handleChange) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "password",
            name: "password",
            placeholder: "Contrase\xF1a",
            value: form.password,
            onChange: handleChange,
            className: "w-full p-2 rounded bg-[#3d3c3c] text-white",
            required: true
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[13] = form.password;
        $[14] = handleChange;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] !== form.direccion || $[17] !== handleChange) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            name: "direccion",
            placeholder: "Direcci\xF3n",
            value: form.direccion,
            onChange: handleChange,
            className: "w-full p-2 rounded bg-[#3d3c3c] text-white",
            required: true
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[16] = form.direccion;
        $[17] = handleChange;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleOnClick,
            type: "submit",
            className: "w-full bg-[#F3CC63] hover:bg-[#f6d783] transition p-2 rounded font-semibold text-black",
            children: "Registrarse"
        }, void 0, false, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    if ($[20] !== t5 || $[21] !== t6 || $[22] !== t7 || $[23] !== t8) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center min-h-screen bg-[#121212]",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "bg-white/3 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4",
                    children: [
                        t4,
                        t5,
                        t6,
                        t7,
                        t8,
                        t9
                    ]
                }, void 0, true, {
                    fileName: "[project]/front/src/componentes/register.tsx",
                    lineNumber: 122,
                    columnNumber: 91
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/front/src/componentes/register.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[20] = t5;
        $[21] = t6;
        $[22] = t7;
        $[23] = t8;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    return t10;
}
_s(Register, "qRhQ5M6AHSy+bt5oF1mOyp/jpYQ=");
_c = Register;
function _RegisterHandleOnClick() {
    window.location.href = "/login";
}
const __TURBOPACK__default__export__ = Register;
var _c;
__turbopack_context__.k.register(_c, "Register");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=front_src_componentes_register_tsx_c480d194._.js.map