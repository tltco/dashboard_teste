// Objects
class Aula{
    constructor(hora, turma, sala, curso, undCurricular, professor, dia, status='pendente'){
        this.hora = hora;
        this.turma = turma;
        this.sala = sala;
        this.curso = curso;
        this.undCurricular = undCurricular;
        this.professor = professor;
        this.dia = dia;
        this.status = status;
    }
}
class Professor{
    constructor(nome, sobrenome){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.aulas = []
        professores.push(this);
    }

    cadastrarAula(hora, turma, sala, curso, undCurricular, dia){
        this.aulas.push(new Aula(hora, turma, sala, curso, undCurricular,
            this.nome, dia));
        if(dia == new Date().getDate()){
            return aulasDoDia(dia);
        }
    }

    setStatusAula(aula, set='cancelada'){
        if(set == 'cancelada'){
            return this.aulas[aula].status = 'cancelada';
        } else if(set == 'concluido'){
            return this.aulas[aula].status = 'concluido';
        } else if(set == 'em_progresso'){
            return this.aulas[aula].status = 'em_progresso';
        }
    }

    editar(){
        const rows = document.getElementsByClassName('agenda__data');
        for(let row of rows){
            const div = row.getElementsByTagName('div');
            if(div[5].innerText == this.nome){
                row.innerHTML =
                `
                <input type="text" value="${div[0].innerText}" style="width: 100px">
                <input type="text" value="${div[1].innerText}" style="width: 100px">
                <input type="text" value="${div[2].innerText}" style="width: 100px">
                <input type="text" value="${div[3].innerText}">
                <input type="text" value="${div[4].innerText}">
                <div>${div[5].innerText}</div>
                <select size="1">
                    <option value="cancelada">Cancelar</option>
                    <option value="concluido">Concluir</option>
                    <option value="fiat">Em progesso</option>
                    <option value="audi">Pendente</option>
                </select>
                `;
            }
        }
    }
}

// FUNCTION AULAS DO DIA
function aulasDoDia(dia){
    const aulasDeHoje = [],
    week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    for(professor of professores){
        for(aula of professor.aulas){
            if(aula.dia == dia){
                aulasDeHoje.push(aula);
            }
        }
    }
    tabela.innerHTML =
    `
    <h3 class="content__header">
        ${week[new Date().getDay()]}, ${dia} de 
        ${months[new Date().getMonth()]} de ${new Date().getFullYear()}
    </h3>
    <div class="agenda__row agenda__label">
        <div>Hora</div>
        <div>Turma</div>
        <div>Sala</div>
        <div>Curso</div>
        <div>Unidade Curricular</div>
        <div>Professor</div>
        <div>Status</div>
    </div>
    `

    for(aula of aulasDeHoje){
        tabela.innerHTML += 
        `
        <div class="agenda__row agenda__data">
            <div>${aula.hora}</div>
            <div>${aula.turma}</div>
            <div>${aula.sala}</div>
            <div>${aula.curso}</div>
            <div>${aula.undCurricular}</div>
            <div>${aula.professor}</div>
            <div>
                <span class="agenda__status status__${aula.status}">${aula.status.replace('_', ' ')}</span>
            </div>
        </div>
        `
    };
}
//CREATING TABELA
const tabela = document.getElementById('station-content');

// CREATING PROFESSORS
const professores = [],
profRenisson = new Professor('Renisson', 'Souza'), // Programação web - projeto integrador
profEdgar = new Professor('Edgar', 'Segundo'), // programação e desenvolvimento web
profAlexandre = new Professor('Alexandre', 'Morais'), // Administração
profMarcelo = new Professor('Marcelo', 'Anjos'), // Téc de Informatica, montagem e manutenção
profGabriel = new Professor('Gabriel', 'Pereira'); // TI para empresas

// CREATING PROF IN LOGIN
const professorOn = profRenisson;

// CREATING AULAS
profEdgar.cadastrarAula('12:00', 01010, 'A2', 'Desenvolvimento Web',
                        'UC3', new Date().getDate());
profEdgar.setStatusAula(0);
profRenisson.cadastrarAula('10:00', 01010, 'A2', 'Programação Web',
                        'UC5', new Date().getDate());
profRenisson.setStatusAula(0, 'concluido')
profAlexandre.cadastrarAula('14:00', 01010, 'A1', 'Administração',
                        'UC1', new Date().getDate());
profAlexandre.setStatusAula(0, 'em_progresso')
profMarcelo.cadastrarAula('18:00', 01010, 'A1', 'Téc. Informática',
                        'UC8', new Date().getDate());
profGabriel.cadastrarAula('20:00', 01010, 'A1', 'TI para Empresas',
                        'UC2', new Date().getDate());

// MAKE DROPDOWN - FUNCTION
function dropdown(icon, container){
    dropdownsIcons.push(icon);
    dropdownsContainers.push(container);
    return(
        container.visible = false,
        icon.addEventListener('click', ()=>{
            if(!container.visible){
                dropdownClose();
                container.style.display = "flex";
                container.visible = !container.visible;
            } else{
                container.style.display = "none";
                container.visible = !container.visible;
            }
        })
    )
}

// ALL DROPDOWNS
const dropdownsIcons = [],
dropdownsContainers = [];

//VIEW DROPDOWN
const view = document.getElementById('view'),
viewDropdown = document.getElementById('view__dropdown');
dropdown(view, viewDropdown);

// CONF DROPDOWN
const config = document.getElementById('config'),
configDropdown = document.getElementById('config__dropdown');
dropdown(config, configDropdown);

// SUPPORT DROPDOWN
const support = document.getElementById('support'),
supportDropdown = document.getElementById('support__dropdown');
dropdown(support, supportDropdown);

// NOTIFICATION DROPDOWN
const notification = document.getElementById('notifications'),
notificationsDropdown = document.getElementById('notifications__dropdown'),
notificationStatus = document.getElementById('notifications__status'); // MEXER - 20/03/2023
dropdown(notification, notificationsDropdown);

// PROFILE DROPDOWN
const profile = document.getElementById('profile'),
profileDropdown = document.getElementById('profile__dropdown');
dropdown(profile, profileDropdown);

// FUNCTION CHECK DROPDOWN OPEN
function dropdownClose(){
    for(container of dropdownsContainers){
        if(container.visible == true){
            container.style.display = "none";
            container.visible = false;
        }
    }
}

// SIDEBAR EXPAND ON HOVER
const app = document.getElementById('app'),
sidebar = document.getElementById('sidebar');

sidebar.addEventListener('mouseover', () =>{
    app.style.gridTemplateColumns = "12.5rem auto";
});

sidebar.addEventListener('mouseleave', () =>{
    app.style.gridTemplateColumns = "3.75rem auto";
    dropdownClose();
});

// GET DATE USERS NAV
const showDate = document.getElementById('time');

function getDateToday(){
    const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth(),
    months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    day = date.getDate(),
    hour = date.getHours(),
    minutes = date.getMinutes();

    return showDate.innerText = `${hour}:${minutes >= 10 ? minutes : '0' + minutes} — Hoje, ${day} ${months[month]} ${year}`;
}

// GET DATE TODAY
getDateToday();
setInterval(getDateToday, 10000);

// SWITCH DARK THEME
const theme = document.getElementById('theme'),
themeIcon = document.getElementById('theme-icon'),
themeDescription = document.getElementById('theme-description'),
toggleSwitch = document.getElementById('switch');
app.darkTheme = false;

theme.addEventListener('click', () =>{
    if(!app.darkTheme){
        themeIcon.innerText = 'wb_sunny';
        themeDescription.innerText = "Tema Claro";
        toggleSwitch.style.justifyContent = "end";
        app.classList.add('dark-theme');
        document.body.style.backgroundColor = "#282A36"
        app.darkTheme = !app.darkTheme;
    } else{
        themeIcon.innerText = 'clear_night';
        themeDescription.innerText = "Tema Escuro";
        toggleSwitch.style.justifyContent = "start";
        app.classList.remove('dark-theme');
        document.body.style.backgroundColor = "#e0e7ff"
        app.darkTheme = !app.darkTheme;
    }
});

// SEARCH BAR
const search = document.getElementById('search');

search.addEventListener('focusin', ()=>{
    const searchIco = document.getElementsByClassName('search__ico');
    searchIco[0].style.display = "none";
    search.style.width = "50rem";
    showDate.style.display = "none";
    search.placeholder = "";
});

search.addEventListener('focusout', ()=>{
    const searchIco = document.getElementsByClassName('search__ico');
    if(search.value == ""){
        searchIco[0].style.display = "inline-block";
    }
    search.placeholder = "Pesquisar";
    showDate.style.display = "block";
    search.style.width = "20rem";
});

// CAROUSEL AND PAGINATIONS
const slider = document.getElementById('slider'),
dots = document.getElementsByClassName('pagination__dots');
let img = 1;

setInterval(() =>{
    if(img <= 2){
        slider.src = `./assets/img/publi${img}.jpg`;
        dots[img-1].classList.remove('active');
        dots[img].classList.add('active');
        img += 1;
    } else{
        img = 0;
        slider.src = `./assets/img/publi${img}.jpg`;
        dots[2].classList.remove('active');
        dots[img].classList.add('active');
        img += 1;
    }
}, 5000);

// MENU LINK ACTIVE FUNCTION
function menuActive(container, links){
    const buttons = container.getElementsByClassName(`${links}`);
    for(let link of buttons){
        link.addEventListener('click', ()=>{
            removeActive(container, links);
            link.classList.add('active');
        })
    }
}

// MENU LINK REMOVE ACTIVE FUNCTION
function removeActive(container, links){
    const buttons = container.getElementsByClassName(`${links}`);
    for(let link of buttons){
        link.classList.remove('active');
    }
}

const menuLink = document.getElementById('sidebar-active'),
stationtabs = document.getElementById('station-tabs');

// CREAT MENU LINK ACTIVE
menuActive(menuLink, 'menu__link');
menuActive(stationtabs, 'station__tab');

// STATIN TABS SWITCH ACTIVE SIDEBAR
const stationTabButtons = stationtabs.getElementsByClassName('station__tab');

function changeSidebarActive(arr, i, to=undefined){
    arr[i].addEventListener('click', () =>{
        removeActive(sidebar, 'menu__link');
        sidebar.getElementsByClassName('menu__link')[to !== undefined ? to : i].classList.add('active');
    })
}

changeSidebarActive(stationTabButtons, 0);
changeSidebarActive(stationTabButtons, 1);
changeSidebarActive(stationTabButtons, 3, 4);

// SIDEBAR BUTTONS - SWITCH SCREEN
const sidebarButtons = menuLink.getElementsByTagName('button');

function switchScreenTo(button, active=undefined, to='agenda'){
    if(to !== 'agenda'){
        button.addEventListener('click', () =>{
            switchScreen(to);
            if(active !== undefined){
                removeActive(stationtabs, 'station__tab');
                stationtabs.getElementsByClassName('station__tab')[active].classList.add('active');
            }
        })
    } else{
        button.addEventListener('click', () =>{
            if(active !== undefined){
                removeActive(stationtabs, 'station__tab');
                stationtabs.getElementsByClassName('station__tab')[active].classList.add('active');
            }
            return aulasDoDia(new Date().getDate());
        })
    }
}

switchScreenTo(sidebarButtons[0], 0, 'overview');
switchScreenTo(sidebarButtons[1], 1);
// switchScreenTo(sidebarButtons[2], '');
// switchScreenTo(sidebarButtons[3], '');
switchScreenTo(sidebarButtons[4], 3, 'tools');

// TABS SWITCH SCREEN
const tabsContainers = document.getElementById('tabs').getElementsByTagName('button');

for(let tab of tabsContainers){
    tab.addEventListener('click', () =>{
        removeActive(stationtabs, 'station__tab');
        stationtabs.getElementsByClassName('station__tab')[2].classList.add('active');
        switchScreen('scholar');
    })
}

//Mini Calendario
const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".calendar__days"),
prevNextIcon = document.querySelectorAll(".nav__ico__wrapper span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const renderCalendar = () => {
    let firstDateofMouth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMouth = new Date(currYear, currMonth +1, 0).getDate(),
    lastDayofMouth = new Date(currYear, currMonth, lastDateofMouth).getDay(),
    lastDateofLastMouth = new Date(currYear, currMonth, 0).getDate(),
    liTag = "";
    
    for (let i = firstDateofMouth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMouth - i + 1}</li>`; 
    }

    for (let i = 1; i <= lastDateofMouth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMouth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMouth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar()

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

// SWITCH SCREEN FUNCTION
function switchScreen(screen){
    if(screen == 'tools'){
        tabela.innerHTML =
        `
        <div class="tools__container">
            <h3 class="content__header">
                Meus Apps
            </h3>
            <div class="tools__content">
                <div class="card__wrapper">
                    <div class="card__title">
                        <h4>Kanban Board</h4>
                    </div>
                    <div class="kanban__wrapper">
                        <div class="card">
                            <div class="card__title">
                                <h5>A Fazer</h5>
                                <div class="edit__card">
                                    <span class="material-symbols-rounded no-fill edit__ico">
                                        more_vert
                                    </span>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__red">
                                        Pendente
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__red">
                                        Pendente
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__red">
                                        Pendente
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card__title">
                                <h5>Em Andamento</h5>
                                <div class="edit__card">
                                    <span class="material-symbols-rounded no-fill edit__ico">
                                        more_vert
                                    </span>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__orange">
                                        Em Andamento
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__orange">
                                        Em Andamento
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__orange">
                                        Em Andamento
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card__title">
                                <h5>Concluído</h5>
                                <div class="edit__card">
                                    <span class="material-symbols-rounded no-fill edit__ico">
                                        more_vert
                                    </span>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__green">
                                        Concluído
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__green">
                                        Concluído
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                            <div class="card__sticky">
                                <div class="description">
                                    <span class="reminder__label__green">
                                        Concluído
                                    </span>
                                    <p class="reminder__details">
                                        Descrição da Tarefa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="card__btn">
                        <button>Adicionar</button>
                    </span>
                </div>
                <div class="card__wrapper">
                    <div class="card__title">
                        <h4>Notas Sticky</h4>
                        <div class="edit__card">
                            <span class="material-symbols-rounded no-fill edit__ico">
                                edit_square
                            </span>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Apresentação
                            </p>
                            <p class="reminder__details">
                                Auditório
                            </p>
                            <p class="reminder__details">
                                <span class="material-symbols-rounded agenda">
                                    calendar_month
                                </span>
                                2 Abril — ás 20:00 hrs
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Tomar Água
                            </p>
                            <p class="reminder__details">
                                <span class="material-symbols-rounded agenda">
                                    calendar_month
                                </span>
                                Agora
                            </p>
                        </div>
                    </div>
                    <div class="card__title">
                        <h4>Cronômetro</h4>
                        <div class="edit__card">
                            <span class="material-symbols-rounded no-fill edit__ico">
                                edit_square
                            </span>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                &#127876; Natal &#127876;
                            </p>
                            <p class="reminder__details">
                                Faltam 282 dias, 10 hrs, 36 minutos e 04 segundos para o Natal!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    } else if(screen == 'scholar'){
        tabela.innerHTML =
        `
        <div class="scholar__container">
            <h3 class="content__header">
                Meus Cursos
            </h3>
            <div class="scholar__content">
                <div class="card__wrapper">
                    <div class="card__title">
                        <h4>Téc. Informática para Internet</h4>
                        <div class="edit__card">
                            <span class="material-symbols-rounded no-fill edit__ico">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 1
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 2
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 3
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 4
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <span class="card__btn">
                        <button>Download</button>
                    </span>
                </div>
                <div class="card__wrapper">
                    <div class="card__title">
                        <h4>Programação Web</h4>
                        <div class="edit__card">
                            <span class="material-symbols-rounded no-fill edit__ico">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 1
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 2
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 3
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 4
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <span class="card__btn">
                        <button>Download</button>
                    </span>
                </div>
                <div class="card__wrapper">
                    <div class="card__title">
                        <h4>Técnico em Banco de Dados</h4>
                        <div class="edit__card">
                            <span class="material-symbols-rounded no-fill edit__ico">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 1
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 2
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 3
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <div class="card__sticky">
                        <div class="description">
                            <p class="reminder__title">
                                Unidade Curricular 4
                            </p>
                            <p class="reminder__details">
                                Cronograma
                            </p>
                        </div>
                    </div>
                    <span class="card__btn">
                        <button>Download</button>
                    </span>
                </div>
            </div>
        </div>
        `
    } else if(screen == 'overview'){
        tabela.innerHTML =
        `
        <div class="overview__container">
            <h3 class="content__header">
                Últimas Atualizações
            </h3>
            <div class="overview__content">
                <!-------------------- RECENT ACTIVITIES -------------------->
                <div class="card__wrapper data__updates">
                    <div class="card__title">
                        <h4>Atividades Recentes</h4>
                    </div>
                    <div class="card__sticky">
                        <img src="./assets/img/avatar-3.png" alt="">
                        <p class="reminder__title">
                            Edgar
                        </p>
                        <p class="reminder__details">
                            alterou status de aula. <br>2min atrás
                        </p>
                    </div>
                    <div class="card__sticky">
                        <img src="./assets/img/avatar-6.png" alt="">
                        <p class="reminder__title">
                            Marcelo Anjos
                        </p>
                        <p class="reminder__details">
                            adicionou status de aula. <br>5min atrás
                        </p>
                    </div>
                    <div class="card__sticky">
                        <img src="./assets/img/avatar-2.png" alt="">
                        <p class="reminder__title">
                            Alexandre
                        </p>
                        <p class="reminder__details">
                            alterou um evento. <br>39min atrás
                        </p>
                    </div>
                    <div class="card__sticky">
                        <img src="./assets/img/avatar-2.png" alt="">
                        <p class="reminder__title">
                            Alexandre
                        </p>
                        <p class="reminder__details">
                            adicionou um evento há 1hr atrás
                        </p>
                    </div>
                </div>
                <!-------------------- CALENDAR -------------------->
                <div class="card__wrapper">
                    <div class="card calendar__weekly">
                        <div class="card__title">
                            <h4>Calendário Semana</h4>
                            <div class="navigate__btn">
                                <span class="material-symbols-rounded">
                                    navigate_before
                                </span>
                                <span class="material-symbols-rounded">
                                    navigate_next
                                </span>
                            </div>
                        </div>
                        <div class="week__group">
                            <div class="days__group">
                                <div class="day__label">D</div>
                                <div class="date__label">1</div>
                                <div class="dot__label"></div>
                            </div>
                            <div class="days__group disable">
                                <div class="day__label">S</div>
                                <div class="date__label">2</div>
                                <div class="dot__label"></div>
                            </div>
                            <div class="days__group active">
                                <div class="day__label">T</div>
                                <div class="date__label">3</div>
                                <div class="dot__label"></div>
                            </div>
                            <div class="days__group">
                                <div class="day__label">Q</div>
                                <div class="date__label">4</div>
                                <div class="dot__label"></div>
                            </div>
                            <div class="days__group">
                                <div class="day__label">Q</div>
                                <div class="date__label">5</div>
                                <div class="dot__label"></div>
                            </div>
                            <div class="days__group">
                                <div class="day__label">S</div>
                                <div class="date__label">6</div>
                                <div class="dot__label"></div>
                            </div>
                            <div class="days__group">
                                <div class="day__label">S</div>
                                <div class="date__label">7</div>
                                <div class="dot__label"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card calendar__month">
                        <div class="card__title">
                            <h4>Calendário Mês</h4>
                        </div>
                        <div class="calendar__wrapper">
                            <div class="calendar__nav">
                                <div class="current__date__group">
                                    <span class="material-symbols-rounded">
                                        calendar_today
                                    </span>
                                    <p class="current-date"></p>
                                </div>
                                <div class="nav__ico__wrapper">
                                    <span id="prev" class="material-symbols-rounded">chevron_left</span>
                                    <span id="next" class="material-symbols-rounded">chevron_right</span>
                                </div>
                            </div>
                            <div class="calendar">
                                <ul class="calendar__weeks">
                                    <li>D</li>
                                    <li>S</li>
                                    <li>T</li>
                                    <li>Q</li>
                                    <li>Q</li>
                                    <li>S</li>
                                    <li>S</li>
                                </ul>
                                <ul class="calendar__days"></ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------------------- CONTACTS -------------------->
                <div class="card__wrapper contacts">
                    <div class="card__title">
                        <h4>Contatos</h4>
                    </div>
                    <div class="contacts__list">
                        <div class="contacts__list__info">
                            <p class="reminder__details">
                                <img src="./assets/img/avatar-3.png" alt="">
                                Edgar Segundo
                            </p>
                            <span class="material-symbols-rounded">
                                more_vert
                            </span>
                        </div>
                        <div class="contacts__list__info">
                            <p class="reminder__details">
                                <img src="./assets/img/avatar-2.png" alt="">
                                Alexandre Morais
                            </p>
                            <span class="material-symbols-rounded">
                                more_vert
                            </span>
                        </div>
                        <div class="contacts__list__info">
                            <p class="reminder__details">
                                <img src="./assets/img/avatar-6.png" alt="">
                                Marcelo Anjos
                            </p>
                            <span class="material-symbols-rounded">
                                more_vert
                            </span>
                        </div>
                    </div>
                    <div class="contacts__mini__1">
                        <img src="./assets/img/avatar-2.png" alt="">
                        <div class="contacts__info">
                            <p class="reminder__title">
                                Alexandre Morais
                            </p>
                            <p class="reminder__details">
                                Administração
                            </p>
                            <button class="card__btn">Ver Mais</button>
                        </div>
                    </div>
                    <div class="contacts__mini__2">
                        <img src="./assets/img/avatar-2.png" alt="">
                        <div class="contacts__info">
                            <p class="reminder__title">
                                Alexandre Morais
                            </p>
                            <p class="reminder__details">
                                Administração
                            </p>
                            <div class="group__btn">
                                <button class="card__btn">Email</button>
                                <button class="card__btn">Contato</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-------------------- EVENTS -------------------->
                <div class="card__wrapper events">
                    <div class="card__title">
                        <h4>Eventos</h4>
                    </div>
                    <div class="card__sticky">
                        <div class="events__list">
                            <div class="events__description">
                                <div class="bullet__point"></div>
                                <p class="reminder__details">Feira de Oportunidades 2023</p>
                            </div>
                            <div class="events__description">
                                <div class="bullet__point"></div>
                                <p class="reminder__details">Semana Senac de Leitura</p>
                            </div>
                            <div class="events__description">
                                <div class="bullet__point"></div>
                                <p class="reminder__details">Feira Virtual 2023</p>
                            </div>
                        </div>
                    </div>
                    <div class="events__mini__1">
                        <img src="./assets/img/publi0.jpg" alt="">
                        <div class="events__info">
                            <p class="reminder__title">
                                Feira de Oportunidades 2023
                            </p>
                            <p class="reminder__details">
                                <span class="material-symbols-rounded agenda">
                                    calendar_month
                                </span>
                                Dias 30 de Maio a 3 de Junho
                            </p>
                            <button class="card__btn">Add</button>
                        </div>
                    </div>
                    <div class="events__mini__2">
                        <img src="./assets/img/publi1.jpg" alt="">
                        <div class="events__info">
                            <p class="reminder__title">
                                Semana Senac de Leitura
                            </p>
                            <p class="reminder__details">
                                <span class="material-symbols-rounded agenda">
                                    calendar_month
                                </span>
                                Dias 20 a 28 de Maio
                            </p>
                            <button class="card__btn">Add</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        `
    }/* else{
        aulasDoDia(new Date().getDate());
    }*/
}

// EXECUTING OVERVIEW DEFAULT PAGE
switchScreen('overview');