# Async Valya Example

**Условие:** Поле валидно, если значение в нем равно 42. Проверить асинхронно
**Решение:** Да у нас же промисы, плевать, что операция асинхронная

```js
validators={[
    {
        validator (value, params) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    if (parseInt(value) + 3 === 45) {
                        resolve();
                    }

                    reject(params.message);
                }, 1000);
            });
        },
        params: {
            message: 'Field should be equal 42'
        }
    }
]}
```
