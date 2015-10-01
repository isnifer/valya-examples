# Original Valya Example

**Условие:** Поле валидно, если в модели есть какое-то значение. Проверить значение в поле при рендеринге формы
**Решение:** Сделаем простую проверку на наличие значения

```js
// ...
validators={[
    {
        validator (value, params) {
            if (value) {
                return Promise.resolve();
            }

            return Promise.reject(params.message);
        },
        params: {
            message: 'Field is required'
        }
    }
]}
initialValidation={true}>
```
