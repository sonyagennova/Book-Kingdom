export function categorySort(category) {
    if(category == "Kids"){
        return "Детска литература"
    } else if(category == "History"){
        return "Историческа литература"
    } else if(category == "Fantasy"){
        return "Фентъзи"
    } else if(category == "Romance"){
        return "Романтика"
    } else if(category == "Adventure"){
        return "Приключенска литература"
    } else if(category == "Mystery"){
        return "Мистерия"
    } else if(category == "Tragedy"){
        return "Трагедия"
    } else if(category == "Autobiography"){
        return "Биография"
    } else if(category == "Classic"){
        return "Класика"
    }
}

export function categorySortPath(category) {
    if(category == "детска литература"){
        return "kids"
    } else if(category == "историческа литература"){
        return "history"
    } else if(category == "фентъзи"){
        return "fantasy"
    } else if(category == "романтика"){
        return "romance"
    } else if(category == "приключенска литература"){
        return "adventure"
    } else if(category == "мистерия"){
        return "mystery"
    } else if(category == "трагедия"){
        return "tragedy"
    } else if(category == "биография"){
        return "autobiography"
    } else if(category == "класика"){
        return "classic"
    }
}