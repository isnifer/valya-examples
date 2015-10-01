# Original Valya Example with external validator

**Условие:** Поле валидно, если в модели есть какое-то значение. Валидатор подключен из npm
**Решение:** Сделаем простую проверку на наличие значения

```js
const externalValidator = require('valya-standard-validator')({message: 'Custom message warning'});
// ...

validators={[externalValidator]}
```
