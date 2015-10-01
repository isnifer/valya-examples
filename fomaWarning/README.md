# Original Valya Example with Foma and Foma-warning

**Условие:** Поле валидно, если в модели есть какое-то значение. Знать при нажатии на submit состояние формы и показывать невалидные поля.
**Решение:** Сделаем простую проверку на наличие значения

```js
// ...
onEnd={(isValid, message) => {
    this.props.setValidationInfo({
        isValid,
        message,
        name: 'username'
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
```jsx
<FomaWarning
    items={this.props.invalidFields.map(function (element) {
        return {
            fieldName: element, // value, username
            name: requiredFields[element] // any string
        };
    })}
    message="These fields are required:">
    <button
        type="submit"
        onClick={::this.onSubmit}
        style={this.props.isInvalid ? {opacity: .5} : {}}>
        Submit
    </button>
</FomaWarning>
```
