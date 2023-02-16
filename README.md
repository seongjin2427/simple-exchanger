# 간단 환율 계산기

## 실행 방법

```
git clone https://github.com/seongjin2427/simple-exchanger.git

cd simple-exchanger

npm install
npm start
```

## 사용 API

https://exchangerate.host/#/

## 사용 라이브러리

- React : 18.0.28
- Typescript : 4.9.5
- styled-components : 5.3.6

## 폴더 구조

```
simple-exchanger-2
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ public
├─ README.md
├─ src
│  ├─ api  // 📁HTTP 요청 로직을 모아둔 폴더
│  │  ├─ exchange.ts  // API에서 사용가능한 국가와 환율 요청 로직
│  │  └─ instance.ts  // default axios 인스턴스 생성
│  ├─ App.tsx
│  ├─ assets  // 📁아이콘을 모아둔 폴더
│  │  ├─ arrow-down.svg
│  │  └─ arrow-up.svg
│  ├─ components  // 📁컴포넌트 관리 폴더
│  │  ├─ Card  // 메인화면의 카드 Wrapper
│  │  │  ├─ Card.styled.ts
│  │  │  ├─ Card.tsx
│  │  │  └─ index.ts
│  │  ├─ InputWrapper  // 컴포넌트를 감싸 Input을 추가하는 컴포넌트
│  │  │  ├─ index.ts
│  │  │  ├─ InputWrapper.styled.ts
│  │  │  └─ InputWrapper.tsx
│  │  └─ Select // Select 컴포넌트
│  │     ├─ index.ts
│  │     ├─ Select.styled.ts
│  │     └─ Select.tsx
│  ├─ hooks  // 📁커스텀 훅을 모아둔 폴더
│  │  ├─ useFromToExchange.ts  // 환율 비교를 위한 로직 커스텀 훅
│  │  └─ useSymbol.ts // API에서 가져오는 국가를 관리하기 위한 커스텀 훅
│  ├─ index.css
│  ├─ index.tsx
│  ├─ logo.svg
│  ├─ react-app-env.d.ts
│  ├─ reportWebVitals.ts
│  ├─ setupTests.ts
│  ├─ types  // 📁프로젝트에서 사용하는 타입 지정파일을 모아둔 폴더
│  │  └─ exchange.ts  // axios의 반환 타입 지정
│  └─ utils  // 📁공통적으로 사용되는 기능을 모아둔 폴더
│     └─ fetcher.ts  // HTTP 요청을 위한 공통 로직
└─ tsconfig.json

```

## 구현 기능

- 환율 정보 fetch 후 비교 및 상태 변경 로직 (`hooks/useFromToExchange`)

  ```tsx
  type ExchangeInfoType = ExchangeSymbolType & { value?: string };

  const regexp = /^[0-9]*$/;

  const useFromToChange = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [exchangeRate, setExchangeRate] = React.useState<number>(1);
    const [from, setFrom] = React.useState<ExchangeInfoType>({
      description: "Select",
      code: "",
      value: "0",
    });

    const [to, setTo] = React.useState<ExchangeInfoType>({
      description: "Select",
      code: "",
      value: "0",
    });

    // 비교 국가 변경시마다 환율 정보를 fetch하여 exchangeRate 상태에 저장
    React.useEffect(() => {
      (async function () {
        setIsLoading(true);
        const response = await getExchangeRateByFromTo({
          from: from.code,
          to: to.code,
        });

        setIsLoading(false);
        if (response?.success) {
          setExchangeRate(response.result);
        }
      })();
    }, [from.code, to.code]);

    // 환율 정보 및 비교 전 숫자가 변경될 때마다 환율 계산 결과 저장
    React.useEffect(() => {
      const fromValue = from.value === undefined ? 0 : +from.value;
      const calculatedValue = (fromValue * exchangeRate).toFixed(4);

      setTo((prev) => ({ ...prev, value: calculatedValue }));
    }, [from.value, exchangeRate]);

    const changeFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (regexp.test(value)) setFrom({ ...from, value });
    };

    const changeFromCode = (symbol: ExchangeSymbolType) => {
      setFrom({ ...from, ...symbol });
    };

    const changeToHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (regexp.test(value)) setTo({ ...to, value });
    };

    const changeToCode = (symbol: ExchangeSymbolType) =>
      setTo({ ...to, ...symbol });

    return {
      from,
      to,
      fromRef,
      toRef,
      changeFromHandler,
      changeFromCode,
      changeToHandler,
      changeToCode,
      isLoading,
    };
  };
  ```

- 해당 로직이 사용된 컴포넌트 (`App.tsx`)

  ```tsx
  function App() {
    const {
      from,
      to,
      changeFromCode,
      changeFromHandler,
      changeToCode,
      changeToHandler,
      isLoading,
    } = useFromToChange();
    const symbols = useSymbol();

    const makeLabel = (label: ExchangeSymbolType) =>
      `${label.description} ${label.code && `(${label.code})`}`;

    const fromLabel = makeLabel(from);
    const toLabel = makeLabel(to);

    return (
      <Card
        title="간단 환율계산기"
        description="국가를 선택하고 금액을 입력하여 환율을 변경해보세요!"
      >
        <InputWrapper onChange={changeFromHandler} value={from.value}>
          <Select dataSet={symbols} onClick={changeFromCode}>
            {isLoading ? <div>Loading...</div> : fromLabel}
          </Select>
        </InputWrapper>
        <InputWrapper onChange={changeToHandler} value={to.value} readOnly>
          <Select dataSet={symbols} onClick={changeToCode}>
            {isLoading ? <div>Loading...</div> : toLabel}
          </Select>
        </InputWrapper>
      </Card>
    );
  }
  ```
