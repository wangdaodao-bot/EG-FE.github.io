# JSON数据传输标准


## 1 简介

`JSON`(JavaScript Object Notation, JS 对象简谱) 是一种轻量级的数据交换格式。它基于 `ECMAScript` (欧洲计算机协会制定的js规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 `JSON` 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。


## 2 JSON数据类型

包括了基本数据类型4种和复合数据类型2种，共6种数据类型。

传输的数据，包括对象属性以及数组成员， **必须(MUST)** 是 6 种 `JSON` 数据类型之一。 **不要(MUST NOT)** 使用`function`、`Date`等 `js` 对象类型。


### 2.1 基本数据类型

- `Number`可以表示整数和浮点数。
- `Boolean` 可以表示真假，值为 `true` 或 `false`。
- `String` 表示一个字符串。
- `Null` 通常用于表示空对象。

`"true"` 和 `true`，这两个数据代表的是不同的数据类型。非字符串类型数据输出时一定 **不要(MUST NOT)** 为两端加上双引号，否则可能产生不希望的后果（如`if`中判断`"false"`的结果是`true`）。其他容易产生错误的例子如：`0`和`"0"`等。



### 2.2 复合数据类型

`Object` 是无序的集合，以键值对的方式保持数据。一个 `Object`中包含零到多个 `name/value`的数据，数据间以逗号(`,`)分隔。`name` 为 `String`类型，`value` 可以是任意类型的数据。

`Object` 的最后一个元素之后一定 **不要(MUST NOT)** 加上分隔符的逗号，否则可能导致解析出错。

`Array` (数组)为多个值的有序集合，数组元素间以逗号(`,`)分隔。



## 3 http响应头


### 3.1 status

`http` 响应的`status` **必须(MUST)** 为 `200`。通常 `JSON` 数据被用于通过 `XMLHttpRequest` 对象访问，通过 `javascript` 进行处理。返回错误的状态码可能导致错误不被响应，数据不被处理。

* 200：代表请求成功，并不代表业务成功，不能作为检查点来设置；  
* 302：重定向，一般用浏览器或者`http`工具请求没问题，用`HttpClient`请求需要处理；    
* 304：请求了一次，本地已经缓存了，再次请求，就会返回`304`，一般是页面在本地加`catch`了；  
* 400：参数错误：漏传参数；  
* 404：路径找不到、服务启动时报错；  
* 405：请求方法错误；`get`、`post`； 
* 415：媒体（数据）类型不一致，这个问题主要就是`content-type`的问题；  
* 500：服务器内部错误，代码运行过程中抛出异常了，并且该异常没有被捕获；  


### 3.2 Content-Type

`Content-Type` 字段定义了响应体的类型。一般情况下，浏览器会根据该类型对内容进行正确的处理。对于传输 `JSON` 数据的响应，`Content-Type` *推荐(RECOMMENDED)* 设置为 `text/javascript` 或 `text/plain` 。 *避免(MUST NOT)* 将 `Context-Type` 设置为 `text/html`，否则可能导致安全问题。

`Content-Type` 中可以指定字符集。通常 *需要(SHOULD)* 明确指定一个字符集。如果是通过 `XMLHTTPRequest` 请求的数据，并且字符编码为 `UTF-8` 时，可以不指定字符集。


`Context-Type` 示例：

	text/javascript;charset=UTF-8



## 4 数据字段

返回的数据包含在 `http` 响应体中。数据 **必须(MUST)** 是一个 `JSON Object` 。该 `Object` 可能包含3个字段：`code` ，`message` ，`data`。


### 4.1 code

`code` 字段 **必须(MUST)** 是一个不小于 `0` 的 `JSON Number` 整数，表示请求的状态。这个字段 **不要(MUST NOT)** 省略。

#### 一个成功请求的code字段

```json
{
    "code": 200,
    "data": "hello world!"
}
```




### 4.2 message

`message` 字段 *通常(SHOULD)* 是一个 `JSON String` 或 `JSON Object` ，表示除了请求状态外 `server` 端想要对 `status` 做出的说明，使 `client` 端能够获取更多信息进行后续处理。这个字段是 *可选的(OPTIONAL)* 。下面的两个例子中，`message` 字段的信息都可以用于 `client` 端程序的后续处理，但是粒度和处理方式会有不同。


#### client端参数错误的message

简单说明的 `message`：

```json
{
    "status": 401,
    "message": "无权限"
}
```

### 4.3 data

`data` 字段可以是除 `JSON Null` 之外的任意 `JSON` 类型，表示请求返回的数据主体。这个字段是 *可选的(OPTIONAL)* 。数据主体 `data` 包含了在请求成功时有意义的数据。


#### 一个查询姓名请求的返回数据

```json
{
    "status": 200,
    "data": "Lily"
}
```


## 5 数据场景

本章为常见数据场景定义了通用的标准数据格式，用于数据传输和使用。

### 5.1 日期类型

日期类型不属于 `JSON` 数据类型。对于日期类型，我们 **必须(MUST)** 使用 `JSON String` 来表示。为了让日期能够更容易的被显示和被解析，对于日期我们 *应当(SHOULD)* 使用更适合 `internet` 的格式，遵循rfc3339。


#### 数据场景：日期

```json
{
    "status": 200,
    "data": "2010-10-10"
}
```




### 5.2 记录

记录代表二维表中的一行，通常用于表示某个具体事务抽象的属性。


#### 数据场景：记录

```json
{
    "id": 250,
    "name": "erik",
    "sex": 1,
    "age": 18
}
```




### 5.3 二维表

标准二维表数据 **必须(MUST)** 以一维 `JSON Array` 形式表示，`JSON Array` 中每一项是一个 `JSON Object`，代表一条记录。`JSON Object` 的每个成员代表一个字段。

#### 数据场景：标准二维表

```json
[
    {
        "id": 250,
        "name": "erik",
        "sex": 1,
        "age": 18
    },
    {
        "id": 251,
        "name": "欧阳先伟",
        "sex": 1,
        "age": 28
    }
]
```


### 5.4 数据页

数据页是列表数据常用的数据方式，可能通过查询或翻页获得数据。数据页是二维表数据的包装，包含列表数据本身更多的信息。

数据页 **必须(MUST)** 是一个 `JSON Object`，其中 **必须(MUST)** 包含的属性为 `data`。`data`是一个二维表。数据页可以包括一些 *可选(OPTIONAL)* 的属性，表示当前数据页的信息。下表列举了数据页的可选属性。


#### 数据页可选属性


* `{Number} page` - 当前页码，计数 **必须(MUST)** 为不小于0的整数，从0开始。
* `{Number} pageSize` - 每页显示条数， **必须(MUST)** 大于0。
* `{Number} total` - 列表总记录数， **必须(MUST)** 为不小于0的整数。表示当前条件下所有记录的数目，非本页的记录数。
* `{String} orderBy` - 列表排序规则。多个排序规则之间以逗号分割（`,`）；正序或倒序以`asc`或`desc`表示，与字段名之间以一个空格间隔。
* `{String} keyword` - 列表所属的搜索关键字。
* `{Object} condition` - 列表所属的搜索条件集合。属性中可以包含或不包含`keyword`字段，如果不包含， *建议(RECOMMMANDED)* 在解析的时候附加搜索关键字`keyword`条件。 


#### 数据场景：数据页

```json
{
    "page": 0,
    "pageSize": 30,
    "keyword": "",
    "data": [
        {
            "id": 250,
            "name": "erik",
            "sex": 1,
            "age": 18
        },
        {
            "id": 251,
            "name": "欧阳先伟",
            "sex": 1,
            "age": 28
        }
    ]
}
```



### 5.5 键/值对象

对于在一个`JSON Object`中表示键/值：

* 键的属性名 **必须(MUST)** 为`name`， **不要(MUST NOT)** 使用 `key` 或 `k`
* 值的属性名 **必须(MUST)** 为`value`， **不要(MUST NOT)** 使用`v`。


#### 数据场景：键/值对象

```json
{
    "name": "BMW",
    "value": 1
}
```



### 5.6 键/值有序集合

键/值有序集合表示对事务或逻辑类型的抽象与分类。常见的应用场景有单选复选框集合，下拉菜单等。

标准的键/值有序集合是一个`JSON Array`，集合中的每一项是一个`JSON Object`。项 **必须(MUST)** 包含`name`和`value`属性。 *可以(MAY)* 通过其他的属性修饰每一项的特殊信息，如`selected`。


#### 数据场景：键/值有序集合

```json
[
    {
        "name": "BMW",
        "value": 1
    },
    {
        "name": "Benz",
        "value": 2,
        "selected": true
    }
]
```




### 5.7 树

树形数据用于表示层叠的数据结构。树型数据 **必须(MUST)** 是一个`JSON Object`，代表树型数据的根节点。下面是标准定义的可选节点列表，不在列表中的属性 *可以(SHOULD)* 自行扩展。


#### 5.7.1 树型数据结构的可选节点属性


* `{Number|String} id` - 节点的唯一标识。
* `{String} text` - 名称或用于显示的字符串。
* `{Array} children` - 子节点列表。


#### 5.7.2 数据场景：树型数据

```json
{
    "id": 1,
    "text": "中国",
    "children": [
        {
            "id": 10,
            "text": "北京",
            "children": [
                {
                    "id": 100,
                    "text": "东城区"
                },
                {
                    "id": 101,
                    "text": "西城区"
                },
                {
                    "id": 102,
                    "text": "海淀区"
                }
                ......
            ]
        },
        {
            "id": 31,
            "text": "海南",
            "children": [
                {
                    "id": 600,
                    "text": "海口"
                },
                {
                    "id": 601,
                    "text": "三亚"
                },
                {
                    "id": 602,
                    "text": "五指山"
                }
                ......
            ]
        }
        ......
    ]
}
```