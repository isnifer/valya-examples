# Valya Example with multiple validators

**Условие:** Поле валидно, если в модели есть какое-то значение
**Решение:** Сделаем простую проверку на наличие значения

```js
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
    },
    {
        validator (value, params) {
            if (parseInt(value) > 10) {
                return Promise.resolve();
            }

            return Promise.reject(params.message);
        },
        params: {
            message: 'This field must be Integer and bigger than 10'
        }
    }
]}
```
