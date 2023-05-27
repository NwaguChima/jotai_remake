import { atom, useAtom } from './jotai';

const salaryAtom = atom<number>(100_000);

function App() {
  const [salary, setSalary] = useAtom(salaryAtom);

  return (
    <div>
      <div>
        <input
          type="text"
          value={salary as number}
          // @ts-ignore
          onChange={(e) => setSalary(Number(e.target.value))}
        />
      </div>

      <div>
        Salary:{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(salary as number)}
      </div>
    </div>
  );
}

export default App;
