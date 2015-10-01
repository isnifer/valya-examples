# Original Valya Example

**Условие:** Поле валидно, если в модели есть какое-то значение. Знать при нажатии на submit состояние формы
**Решение:** Сделаем простую проверку на наличие значения

```js
// ...
onEnd={(isValid, message) => {
    this.props.setValidationInfo({
        isValid,
        message,
        name: 'value'
    });
}}
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
