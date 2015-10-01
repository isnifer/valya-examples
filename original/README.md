# Original Valya Example

**Условие:** Поле валидно, если в модели есть какое-то значение
**Решение:** Сделаем простую проверку на наличие значения

```js
{
    validator (value, params) {
        if (value) {
            Promise.resolve();
        }

        Promise.reject(params.message);
    },
    params: {
        message: 'Field is required'
    }
}
```
