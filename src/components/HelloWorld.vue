<template>
    <section>
        <h1>Тестовое задание для Zecurion</h1>
        <div>
            <p>Здравствуйте! Хотелось бы сказать пару слов о том, что у меня получилось по итогу.</p>
            <p>Из представленного <a href="https://codepen.io/i-shornikov/pen/eYBjpOe">примера</a> я выявил, 
                что при удалении задачи / даты / статуса - коллекция с событиями никак не редактировалась.
            </p>
            <p>Мне это решение показалось некорректным, так как в событиях тогда сохраняются строки - "призраки", 
                поэтому при удалении одного элемента - коллекция с событиями подгоняется под это действие.
            </p>
            <br/>
            <p>Для задач, дат и статусов я использовал словарь (Map), который также является коллекцией. <br/>
                Он отлично подходит под сохранение записей ключ-значение и легок в дальнейшей работе в коде. <br />
                Дата в таблице сортируется по возрастанию.
            </p>
            <p>Все связи сохраняются в обыкновенный JSON (тоже является коллекцией), где ключем является расположение
                значения в таблице по координатам X_Y.
            </p>
            <p>Например таблица 3x3 выглядит так:</p>
            <p>0_0 &nbsp; 0_1 &nbsp; 0_2 <br>
                1_0 &nbsp; 1_1 &nbsp; 1_2 <br>
                2_0 &nbsp; 2_1 &nbsp; 2_2
            </p>
        </div>
    </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
$gray-color: #e1e1e3;
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div {
    margin: 0 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    border-radius: 5px;
    border: 1px solid $gray-color;
}
section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>