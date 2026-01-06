import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const fraudExamples = [
    {
      title: 'Поддельные ссылки',
      icon: 'Link',
      description: 'Злоумышленники отправляют ссылки, похожие на настоящие, но ведущие на фишинговые сайты',
      details: [
        'Замена латинских букв на похожие символы (gооgle.com с кириллическими "о")',
        'Добавление лишних букв или дефисов (go-ogle.com, gooogle.com)',
        'Использование неправильных доменов (.net вместо .com)',
        'Короткие ссылки, скрывающие настоящий адрес (bit.ly, clck.ru)'
      ],
      howToProtect: 'Наводите курсор на ссылку перед кликом, проверяйте полный URL в нижней части браузера',
      danger: 'high',
    },
    {
      title: 'Поддельные сайты',
      icon: 'Globe',
      description: 'Копии популярных сайтов, созданные для кражи данных пользователей',
      details: [
        'Точная визуальная копия банка или популярного сервиса',
        'Похожий, но не идентичный адрес сайта',
        'Отсутствие SSL-сертификата (нет замка в адресной строке)',
        'Поддельные страницы авторизации известных сервисов'
      ],
      howToProtect: 'Проверяйте URL, ищите зеленый замок https://, добавляйте важные сайты в закладки',
      danger: 'high',
    },
    {
      title: 'Мошенничество в Steam',
      icon: 'Gamepad2',
      description: 'Фальшивые предложения о выигрыше скинов, вещей или бесплатных игр',
      details: [
        'Сообщения от "модераторов Steam" о выигрыше',
        'Просьбы войти на сторонний сайт для получения приза',
        'Боты с предложениями обмена вещами на выгодных условиях',
        'Фишинговые сайты steаmcommunity.com (с кириллической "а")',
        'Подделка сайтов популярных трейдинг-площадок'
      ],
      howToProtect: 'Steam никогда не просит логин через сторонние сайты. Используйте Steam Guard (2FA)',
      danger: 'high',
    },
    {
      title: 'Мошенничество в VK',
      icon: 'Users',
      description: 'Взлом аккаунтов друзей с просьбами о переводе денег и фейковые страницы',
      details: [
        'Сообщения от друзей: "Привет, нужна срочная помощь, переведи деньги"',
        'Фишинговые опросы и конкурсы с требованием ввести данные',
        'Поддельные страницы знаменитостей с розыгрышами',
        'Боты в комментариях с обещаниями заработка',
        'Паблики с "бесплатными" товарами за репост'
      ],
      howToProtect: 'Проверяйте аккаунт друга через звонок, не переходите по ссылкам из непроверенных пабликов',
      danger: 'high',
    },
    {
      title: 'Обман в Telegram',
      icon: 'MessageCircle',
      description: 'Фейковые инвестиционные каналы, боты-мошенники и поддельные аккаунты',
      details: [
        'Каналы с "гарантированным заработком" на крипте и форексе',
        'Боты, требующие предоплату за услуги',
        'Поддельные аккаунты известных людей с просьбами о помощи',
        'Пирамиды и финансовые схемы под видом инвестиций',
        'Фейковые магазины с оплатой без гарантий'
      ],
      howToProtect: 'Проверяйте наличие галочки верификации, не доверяйте обещаниям быстрой прибыли',
      danger: 'high',
    },
  ];

  const protectionMethods = [
    {
      title: 'Проверяйте URL-адреса',
      icon: 'Search',
      description: 'Внимательно смотрите на адресную строку браузера перед вводом данных',
      tips: ['Ищите https://', 'Проверяйте правильность написания домена', 'Остерегайтесь подозрительных символов'],
    },
    {
      title: 'Используйте двухфакторную аутентификацию',
      icon: 'Shield',
      description: 'Включите 2FA на всех важных аккаунтах для дополнительной защиты',
      tips: ['SMS-коды', 'Приложения-аутентификаторы', 'Биометрия'],
    },
    {
      title: 'Не переходите по подозрительным ссылкам',
      icon: 'AlertTriangle',
      description: 'Не кликайте на ссылки в подозрительных письмах и сообщениях',
      tips: ['Проверяйте отправителя', 'Не открывайте вложения от незнакомцев', 'Используйте официальные приложения'],
    },
    {
      title: 'Обновляйте программное обеспечение',
      icon: 'RefreshCw',
      description: 'Регулярно обновляйте браузеры, ОС и антивирусы',
      tips: ['Включите автообновления', 'Используйте лицензионное ПО', 'Установите антивирус'],
    },
  ];

  const usefulResources = [
    {
      title: 'VirusTotal',
      description: 'Проверка файлов и ссылок на вирусы',
      url: 'virustotal.com',
      icon: 'ScanSearch',
      category: 'Проверка ссылок'
    },
    {
      title: 'Google Safe Browsing',
      description: 'Проверка сайта на безопасность',
      url: 'transparencyreport.google.com/safe-browsing',
      icon: 'Shield',
      category: 'Проверка сайтов'
    },
    {
      title: 'Роскомнадзор - Киберугрозы',
      description: 'Официальная информация о кибербезопасности',
      url: 'rkn.gov.ru',
      icon: 'Info',
      category: 'Информация'
    },
    {
      title: 'Мошенники.нет',
      description: 'База мошеннических сайтов и номеров',
      url: 'moshenniki.net',
      icon: 'Database',
      category: 'База данных'
    },
    {
      title: 'CheckShortURL',
      description: 'Раскрытие коротких ссылок',
      url: 'checkshorturl.com',
      icon: 'Link',
      category: 'Проверка ссылок'
    },
    {
      title: 'URLVoid',
      description: 'Сканирование репутации сайта',
      url: 'urlvoid.com',
      icon: 'ScanLine',
      category: 'Проверка сайтов'
    }
  ];

  const suspiciousLinkExamples = [
    {
      url: 'https://gooogle.com/login',
      reason: 'Лишняя буква "о" в домене',
      isLegit: false,
      correctUrl: 'https://google.com'
    },
    {
      url: 'http://sberbank-online.ru',
      reason: 'Отсутствие https:// и неофициальный домен',
      isLegit: false,
      correctUrl: 'https://sberbank.ru'
    },
    {
      url: 'https://vk.com/login',
      reason: 'Официальный адрес VK с https://',
      isLegit: true,
      correctUrl: ''
    },
    {
      url: 'https://steamcommunіty.com',
      reason: 'Буква "і" (кириллическая) вместо "i" (латинской)',
      isLegit: false,
      correctUrl: 'https://steamcommunity.com'
    }
  ];

  const practicalTips = [
    {
      icon: 'Key',
      title: 'Используйте надежные пароли',
      description: 'Создавайте уникальные пароли для каждого сайта, используйте менеджеры паролей',
    },
    {
      icon: 'Mail',
      title: 'Проверяйте электронную почту',
      description: 'Остерегайтесь писем с угрозами, срочными предложениями или странными запросами',
    },
    {
      icon: 'Phone',
      title: 'Будьте осторожны с телефонными звонками',
      description: 'Не сообщайте конфиденциальные данные по телефону, даже если звонящий представляется банком',
    },
    {
      icon: 'CreditCard',
      title: 'Защитите финансовые данные',
      description: 'Никогда не сообщайте CVV-код, ПИН-код или полные реквизиты карты по телефону или в соцсетях',
    },
    {
      icon: 'Eye',
      title: 'Проверяйте разрешения приложений',
      description: 'Следите за тем, какие разрешения запрашивают приложения на вашем устройстве',
    },
    {
      icon: 'Wifi',
      title: 'Избегайте публичных Wi-Fi сетей',
      description: 'Не вводите пароли и не совершайте платежи через незащищенные публичные сети',
    },
  ];

  const quizQuestions = [
    {
      question: 'Что такое фишинг?',
      options: [
        'Вид рыбалки в интернете',
        'Метод мошенничества для кражи личных данных',
        'Способ ускорения интернета',
        'Антивирусная программа',
      ],
      correct: 1,
    },
    {
      question: 'Какой из этих URL-адресов выглядит подозрительно?',
      options: ['https://google.com', 'https://gooogle.com', 'https://www.google.com', 'https://google.ru'],
      correct: 1,
    },
    {
      question: 'Что НЕ следует делать при получении подозрительного письма?',
      options: [
        'Проверить адрес отправителя',
        'Сразу кликнуть на все ссылки',
        'Удалить письмо',
        'Сообщить в службу поддержки',
      ],
      correct: 1,
    },
    {
      question: 'Что такое двухфакторная аутентификация?',
      options: [
        'Двойная оплата услуг',
        'Дополнительный уровень защиты аккаунта',
        'Регистрация на двух сайтах',
        'Использование двух паролей',
      ],
      correct: 1,
    },
    {
      question: 'Какие данные НИКОГДА нельзя сообщать мошенникам?',
      options: ['Ваше имя', 'CVV-код и ПИН-код карты', 'Ваш возраст', 'Название города'],
      correct: 1,
    },
  ];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (parseInt(answer) === quizQuestions[index].correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const getDangerColor = () => {
    return 'bg-red-100 text-red-700 border-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-blue-600" size={32} />
              <span className="text-xl font-bold text-gray-900">Цифровая Безопасность</span>
            </div>
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection('phishing')}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Что такое фишинг
              </button>
              <button
                onClick={() => scrollToSection('examples')}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Примеры
              </button>
              <button
                onClick={() => scrollToSection('protection')}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Защита
              </button>
              <button
                onClick={() => scrollToSection('quiz')}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Тест
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 animate-fade-in">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 text-base px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Icon name="ShieldAlert" size={16} className="mr-2" />
            Образовательная платформа
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Защитите себя от <span className="text-red-600">мошенничества</span> в интернете
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Научитесь распознавать фишинг и защищать свои данные в цифровом мире
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => scrollToSection('phishing')} className="gap-2">
              <Icon name="BookOpen" size={20} />
              Начать обучение
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('quiz')} className="gap-2">
              <Icon name="ClipboardCheck" size={20} />
              Пройти тест
            </Button>
          </div>
        </div>
      </section>

      <section id="phishing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200">
              <Icon name="AlertCircle" size={16} className="mr-2" />
              Определение
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Что такое фишинг?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Фишинг — это вид интернет-мошенничества, целью которого является получение конфиденциальной информации
              пользователей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Target" className="text-red-600" size={24} />
                </div>
                <CardTitle>Цель мошенников</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Получить доступ к паролям, данным банковских карт, личной информации и аккаунтам пользователей
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Mail" className="text-orange-600" size={24} />
                </div>
                <CardTitle>Методы атаки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Поддельные письма, сайты-двойники, сообщения в мессенджерах, фальшивые предложения и акции
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="TrendingUp" className="text-yellow-600" size={24} />
                </div>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Более 90% кибератак начинаются с фишинга. Ежегодно миллионы пользователей становятся жертвами
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Icon name="Info" size={24} />
                Как это работает?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-red-600 flex-shrink-0">1.</span>
                  <span>
                    <strong>Маскировка:</strong> Мошенники создают поддельные сайты или сообщения, имитирующие
                    известные компании
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600 flex-shrink-0">2.</span>
                  <span>
                    <strong>Приманка:</strong> Пользователь получает срочное сообщение с просьбой войти в аккаунт или
                    обновить данные
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600 flex-shrink-0">3.</span>
                  <span>
                    <strong>Кража:</strong> При вводе данных на поддельном сайте информация попадает к мошенникам
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600 flex-shrink-0">4.</span>
                  <span>
                    <strong>Использование:</strong> Злоумышленники получают доступ к аккаунтам и финансам жертвы
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="examples" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">
              <Icon name="FileWarning" size={16} className="mr-2" />
              Примеры
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Виды мошенничества</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Познакомьтесь с наиболее распространенными видами фишинга и обмана в интернете
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fraudExamples.map((example, index) => (
              <Card
                key={index}
                className="border-2 border-red-300 bg-red-50 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedExample(selectedExample === index ? null : index)}
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Icon name={example.icon as any} className="text-red-600" size={28} />
                  </div>
                  <CardTitle className="text-xl text-red-800">{example.title}</CardTitle>
                  <CardDescription className="text-red-700">{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedExample === index && (
                    <div className="mb-4 space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-red-200">
                        <p className="text-sm font-bold text-red-800 mb-2">Детали мошенничества:</p>
                        <ul className="space-y-2">
                          {example.details?.map((detail, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-gray-700">
                              <Icon name="AlertCircle" className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 border border-green-300">
                        <p className="text-sm font-bold text-green-800 mb-1">Как защититься:</p>
                        <p className="text-sm text-gray-700">{example.howToProtect}</p>
                      </div>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <Icon name={selectedExample === index ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
                    {selectedExample === index ? 'Скрыть детали' : 'Показать детали'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-red-50 border-2 border-red-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 text-2xl">
                <Icon name="AlertTriangle" size={28} />
                Признаки фишинга
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Срочные требования действий или угрозы блокировки</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Подозрительный адрес отправителя или URL</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Орфографические и грамматические ошибки</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Слишком заманчивые предложения</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Запросы конфиденциальных данных</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Незапрашиваемые вложения в письмах</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="protection" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
              <Icon name="ShieldCheck" size={16} className="mr-2" />
              Защита
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Как защититься от фишинга</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Эффективные методы защиты и практические советы по безопасности в интернете
            </p>
          </div>

          <Tabs defaultValue="methods" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 max-w-3xl mx-auto">
              <TabsTrigger value="methods">Методы защиты</TabsTrigger>
              <TabsTrigger value="links">Распознавание ссылок</TabsTrigger>
              <TabsTrigger value="tips">Практические советы</TabsTrigger>
            </TabsList>

            <TabsContent value="methods" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {protectionMethods.map((method, index) => (
                  <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={method.icon as any} className="text-green-600" size={28} />
                      </div>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {method.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex gap-2 items-start">
                            <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="links" className="mt-8">
              <div className="space-y-6">
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Icon name="Eye" size={24} />
                      Как распознать подозрительные ссылки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">Научитесь отличать безопасные ссылки от фишинговых. Вот примеры:</p>
                    <div className="space-y-4">
                      {suspiciousLinkExamples.map((link, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border-2 ${
                            link.isLegit ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <Icon 
                              name={link.isLegit ? "CheckCircle2" : "XCircle"} 
                              className={link.isLegit ? "text-green-600" : "text-red-600"}
                              size={24}
                            />
                            <div className="flex-1">
                              <p className="font-mono text-sm mb-2 break-all font-semibold">{link.url}</p>
                              <p className="text-sm text-gray-700 mb-2">
                                <strong>Причина:</strong> {link.reason}
                              </p>
                              {!link.isLegit && link.correctUrl && (
                                <p className="text-sm text-green-700">
                                  <strong>Правильный адрес:</strong> {link.correctUrl}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <Icon name="Lightbulb" size={24} />
                      Полезные инструменты для проверки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {usefulResources.map((resource, index) => (
                        <div 
                          key={index}
                          className="bg-white p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name={resource.icon as any} className="text-purple-600" size={20} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{resource.title}</h4>
                              <p className="text-xs text-purple-600 mb-2">{resource.category}</p>
                              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                              <a 
                                href={`https://${resource.url}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                {resource.url}
                                <Icon name="ExternalLink" size={14} />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practicalTips.map((tip, index) => (
                  <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={tip.icon as any} className="text-blue-600" size={24} />
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 text-2xl">
                <Icon name="Lightbulb" size={28} />
                Золотые правила безопасности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-3 text-lg">✓ ВСЕГДА:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Проверяйте URL перед вводом данных</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Используйте уникальные пароли</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Включайте двухфакторную аутентификацию</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Обновляйте программы и антивирус</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-3 text-lg">✗ НИКОГДА:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Не переходите по подозрительным ссылкам</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Не сообщайте пароли и CVV-коды</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Не доверяйте срочным требованиям</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="X" className="text-red-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">Не используйте публичные Wi-Fi для платежей</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="quiz" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
              <Icon name="Brain" size={16} className="mr-2" />
              Проверка знаний
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Тест: Знаете ли вы о фишинге?</h2>
            <p className="text-lg text-gray-600">Проверьте свои знания о цифровой безопасности</p>
          </div>

          <Card className="border-2 shadow-xl">
            {!quizStarted ? (
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="GraduationCap" className="text-blue-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Готовы проверить свои знания?</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Тест состоит из {quizQuestions.length} вопросов. Выберите правильный ответ для каждого вопроса.
                </p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="gap-2">
                  <Icon name="Play" size={20} />
                  Начать тест
                </Button>
              </CardContent>
            ) : quizCompleted ? (
              <CardContent className="p-12 text-center">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    score >= 4 ? 'bg-green-100' : score >= 3 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}
                >
                  <Icon
                    name={score >= 4 ? 'Trophy' : score >= 3 ? 'Medal' : 'Target'}
                    className={score >= 4 ? 'text-green-600' : score >= 3 ? 'text-yellow-600' : 'text-red-600'}
                    size={48}
                  />
                </div>
                <h3 className="text-3xl font-bold mb-4">Тест завершен!</h3>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-blue-600 mb-2">
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="text-gray-600">Правильных ответов</p>
                </div>
                <div className="mb-8">
                  <Progress value={(score / quizQuestions.length) * 100} className="h-3" />
                </div>
                <p className="text-lg mb-8 text-gray-700">
                  {score >= 4
                    ? '🎉 Отлично! Вы хорошо разбираетесь в цифровой безопасности!'
                    : score >= 3
                    ? '👍 Хорошо! Но есть куда расти. Повторите материал.'
                    : '📚 Рекомендуем внимательно изучить материалы о фишинге.'}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={resetQuiz} variant="outline" className="gap-2">
                    <Icon name="RotateCcw" size={20} />
                    Пройти снова
                  </Button>
                  <Button onClick={() => scrollToSection('hero')} className="gap-2">
                    <Icon name="BookOpen" size={20} />
                    Повторить материал
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Вопрос {currentQuestion + 1} из {quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                  <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                </div>

                <h3 className="text-2xl font-bold mb-8 text-gray-900">{quizQuestions[currentQuestion].question}</h3>

                <RadioGroup
                  value={selectedAnswers[currentQuestion]}
                  onValueChange={handleAnswerSelect}
                  className="space-y-4 mb-8"
                >
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="gap-2"
                  >
                    <Icon name="ChevronLeft" size={20} />
                    Назад
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestion]}
                    className="gap-2"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Завершить' : 'Далее'}
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Shield" size={28} />
                <span className="text-xl font-bold">Цифровая Безопасность</span>
              </div>
              <p className="text-gray-400">Образовательная платформа для повышения цифровой грамотности</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Разделы</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection('phishing')} className="hover:text-white transition-colors">
                    Что такое фишинг
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('examples')} className="hover:text-white transition-colors">
                    Примеры мошенничества
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('protection')} className="hover:text-white transition-colors">
                    Методы защиты
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('quiz')} className="hover:text-white transition-colors">
                    Тест знаний
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Полезные ресурсы</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Роскомнадзор</li>
                <li>МВД России</li>
                <li>Госуслуги</li>
                <li>Центробанк РФ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Цифровая Безопасность. Образовательный проект</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;