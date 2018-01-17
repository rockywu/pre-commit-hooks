/**
 * vue项目基本eslint扫描规范
 */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  plugins: [],
  extends: [
    /**
     * webstorm config: https://github.com/standard/standard/blob/master/docs/webstorm.md
     * https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
     */
    'standard',

    /**
     * http://eslint.cn/docs/user-guide/configuring#using-eslintrecommended
     */
    'eslint:recommended',

    /**
     * https://github.com/vuejs/eslint-plugin-vue#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead
     */
    'plugin:vue/recommended'
  ],
  rules: {
    /**
     * JS standard基本配置
     */
    'semi': ['warn', 'always'], //语句强制分号结尾
    'semi-spacing': ['warn', {'before': false, 'after': true}],//分号结尾空格问题
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //是否禁用debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', //是否禁用console
    'no-multiple-empty-lines': [1, {'max': 2}], // 空行最多不能超过2行

    /**
     * Vue基本配置
     * 模式 plugin:vue/base
     */

    /**
     * 支持在template指令中添加注释
     * support comment-directives in <template>
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/comment-directive.md
     */
    'vue/comment-directive': ['warn'],

    /**
     * 防止在运用jsx规范，被标记为未被使用
     * prevent variables used in JSX to be marked as unused
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/jsx-uses-vars.md
     */
    'vue/jsx-uses-vars': 'error',

    /**
     * Vue基本配置
     * 模式 plugin:vue/essential
     */

    /**
     * 计算属性禁止包含异步方法
     * disallow asynchronous actions in computed properties
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-async-in-computed-properties.md
     */
    'vue/no-async-in-computed-properties': 'error',

    /**
     * 禁止重复字段键名
     * disallow duplication of field names
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-dupe-keys.md
     */
    'vue/no-dupe-keys': 'error',

    /**
     * 禁止出现重复的属性
     * disallow duplication of attributes
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-duplicate-attributes.md
     */
    'vue/no-duplicate-attributes': 'error',

    /**
     * 禁止出现语法错误
     * disallow parsing errors in <template>
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-parsing-error.md
     */
    'vue/no-parsing-error': ['error', {
      'abrupt-closing-of-empty-comment': true,
      'absence-of-digits-in-numeric-character-reference': true,
      'cdata-in-html-content': true,
      'character-reference-outside-unicode-range': true,
      'control-character-in-input-stream': true,
      'control-character-reference': true,
      'eof-before-tag-name': true,
      'eof-in-cdata': true,
      'eof-in-comment': true,
      'eof-in-tag': true,
      'incorrectly-closed-comment': true,
      'incorrectly-opened-comment': true,
      'invalid-first-character-of-tag-name': true,
      'missing-attribute-value': true,
      'missing-end-tag-name': true,
      'missing-semicolon-after-character-reference': true,
      'missing-whitespace-between-attributes': true,
      'nested-comment': true,
      'noncharacter-character-reference': true,
      'noncharacter-in-input-stream': true,
      'null-character-reference': true,
      'surrogate-character-reference': true,
      'surrogate-in-input-stream': true,
      'unexpected-character-in-attribute-name': true,
      'unexpected-character-in-unquoted-attribute-value': true,
      'unexpected-equals-sign-before-attribute-name': true,
      'unexpected-null-character': true,
      'unexpected-question-mark-instead-of-tag-name': true,
      'unexpected-solidus-in-tag': true,
      'unknown-named-character-reference': true,
      'end-tag-with-attributes': true,
      'duplicate-attribute': true,
      'end-tag-with-trailing-solidus': true,
      'non-void-html-element-start-tag-with-trailing-solidus': false,
      'x-invalid-end-tag': true,
      'x-invalid-namespace': true
    }],

    /**
     * 禁止覆盖保留字
     * disallow overwriting reserved keys
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-reserved-keys.md
     */
    'vue/no-reserved-keys': 'error',

    /**
     * 组件的 data 属性的值必须是一个函数
     * --fix
     * enforce component's data property to be a function
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-shared-component-data.md
     */
    'vue/no-shared-component-data': 'error',

    /**
     * 禁止在计算属性中对属性修改
     * disallow side effects in computed properties
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-side-effects-in-computed-properties.md
     */
    'vue/no-side-effects-in-computed-properties': 'off',

    /**
     * 禁止 <template> 使用属性
     * disallow key attribute on <template>
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-template-key.md
     */
    'vue/no-template-key': 'warn',

    /**
     * 禁止在 <textarea> 中出现 {{message}}
     * disallow mustaches in <textarea>
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-textarea-mustache.md
     */
    'vue/no-textarea-mustache': 'error',

    /**
     * 禁止v-for指令或范围属性的未使用的变量定义
     * disallow unused variable definitions of v-for directives or scope attributes
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-unused-vars.md
     */
    'vue/no-unused-vars': 'warn',

    /**
     * 动态组件<component> 必须有 v-bind:is
     * require v-bind:is of <component> elements
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-component-is.md
     */
    'vue/require-component-is': 'error',

    /**
     * render 函数必须有返回值
     * enforce render function to always return value
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-render-return.md
     */
    'vue/require-render-return': 'error',

    /**
     * v-for 指令的元素必须有 v-bind:key
     * require v-bind:key with v-for directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-v-for-key.md
     */
    'vue/require-v-for-key': 'error',

    /**
     * prop 的默认值必须匹配它的类型
     * enforce props default values to be valid
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-valid-default-prop.md
     */
    'vue/require-valid-default-prop': 'error',

    /**
     * 计算属性必须有返回值
     * enforce that a return statement is present in computed property
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/return-in-computed-property.md
     */
    'vue/return-in-computed-property': 'error',

    /**
     * template 的根节点必须合法
     * enforce valid template root
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-template-root.md
     */
    'vue/valid-template-root': 'error',

    /**
     * v-bind 指令必须合法
     * enforce valid v-bind directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-bind.md
     */
    'vue/valid-v-bind': 'error',

    /**
     * v-cloak 指令必须合法
     * enforce valid v-cloak directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-cloak.md
     */
    'vue/valid-v-cloak': 'error',

    /**
     * v-else-if  指令必须合法
     * enforce valid v-else-if directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-else-if.md
     */
    'vue/valid-v-else-if': 'error',

    /**
     * v-else 指令必须合法
     * enforce valid v-else directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-else.md
     */
    'vue/valid-v-else': 'error',

    /**
     * v-for 指令必须合法
     * enforce valid v-for directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-for.md
     */
    'vue/valid-v-for': 'error',

    /**
     * v-html 指令必须合法
     * enforce valid v-html directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-html.md
     */
    'vue/valid-v-html': 'error',

    /**
     * v-if 指令必须合法
     * enforce valid v-if directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-if.md
     */
    'vue/valid-v-if': 'error',

    /**
     * v-model 指令必须合法
     * enforce valid v-model directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-model.md
     */
    'vue/valid-v-model': 'error',

    /**
     * v-on 指令必须合法
     * enforce valid v-on directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-on.md
     */
    'vue/valid-v-on': 'error',

    /**
     * v-once 指令必须合法
     * enforce valid v-once directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-once.md
     */
    'vue/valid-v-once': 'error',

    /**
     * v-pre 指令必须合法
     * enforce valid v-pre directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-pre.md
     */
    'vue/valid-v-pre': 'error',

    /**
     * v-show 指令必须合法
     * enforce valid v-show directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-show.md
     */
    'vue/valid-v-show': 'error',

    /**
     * v-text 指令必须合法
     * enforce valid v-text directives
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-text.md
     */
    'vue/valid-v-text': 'error',

    /**
     * Vue基本配置
     * 模式 plugin:vue/strongly-recommended
     */

    /**
     * 限制自定义组件的属性风格
     * --fix
     * enforce attribute naming style in template
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/attribute-hyphenation.md
     */
    'vue/attribute-hyphenation': 'off',

    /**
     *  html 的结束标签必须符合规定 当off 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的
     * --fix
     * enforce end tag style
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-end-tags.md
     */
    'vue/html-end-tags': 'off',

    /**
     * html中的缩进
     * --fix
     * enforce consistent indentation in <template>
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-indent.md
     */
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],

    /**
     * 没有内容时，组件必须自闭和
     * --fix
     * enforce self-closing style
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-self-closing.md
     */
    'vue/html-self-closing': ['warn', {
      'html': {
        'void': 'never',
        'normal': 'always',
        'component': 'always'
      }
    }],

    /**
     * 限制每行允许的最多属性数量
     * enforce the maximum number of attributes per line
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/max-attributes-per-line.md
     */
    'vue/max-attributes-per-line': 'warn',

    /**
     * 限制 {{  }} 的风格
     * --fix
     * enforce unified spacing in mustache interpolations
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/mustache-interpolation-spacing.md
     */
    'vue/mustache-interpolation-spacing': 'warn',

    /**
     * vue组件name属性命名方式
     * --fix
     * enforce specific casing for the name property in Vue components
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/name-property-casing.md
     */
    'vue/name-property-casing': 'off',

    /**
     * 禁止出现连续空格
     * --fix
     * disallow multiple spaces
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-multi-spaces.md
     */
    'vue/no-multi-spaces': 'warn',

    /**
     * 要求为每个未标记为必需的道具设置默认值
     * require default value for props
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-default-prop.md
     */
    'vue/require-default-prop': 'warn',

    /**
     * 必须设置props属性类型
     * require type definitions in props
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-prop-types.md
     */
    'vue/require-prop-types': 'error',

    /**
     * 设置bind样式默认为短写
     * --fix
     * enforce v-bind directive style
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/v-bind-style.md
     */
    'vue/v-bind-style': 'warn',

    /**
     * 设置on样式 默认为短写
     * --fix
     * enforce v-on directive style
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/v-on-style.md
     */
    'vue/v-on-style': 'warn',

    /**
     * Vue基本配置
     * 模式 plugin:vue/strongly-recommended
     */

    /**
     * 属性值必须用双引号括起来
     * --fix
     * enforce quotes style of HTML attributes
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-quotes.md
     */
    'vue/html-quotes': 'warn',

    /**
     * 禁止出现难以理解的 v-if 和 v-for
     * disallow confusing v-for and v-if on the same element
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-confusing-v-for-v-if.md
     */
    'vue/no-confusing-v-for-v-if': 'error',

    /**
     * 组件的属性必须为一定的顺序
     * enforce order of properties in components
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/order-in-components.md
     */
    'vue/order-in-components': 'off',

    /**
     * 在模板中强制使用this，默认为不适用
     * enforce usage of this in template
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/this-in-template.md
     */
    'vue/this-in-template': 'error',

    /**
     * Vue基本配置
     * 模式 Uncategorized
     */

    /**
     *在标签的右括号之前 需要或不需要换行
     * --fix
     * require or disallow a line break before tag's closing brackets
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-newline.md
     */
    'vue/html-closing-bracket-newline': 'warn',

    /**
     * 在标签的右括号之前 需要或不需要空格
     * --fix
     * require or disallow a space before tag's closing brackets
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-spacing.md
     */
    'vue/html-closing-bracket-spacing': 'warn',

    /**
     * script标签内的缩进 暂时关闭(当代码中出现!开头的语句时，会导致shell异常退出,待后续优化)
     * --fix
     * enforce consistent indentation in <script>
     * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md
     */
    'vue/script-indent': 0
  }
};
