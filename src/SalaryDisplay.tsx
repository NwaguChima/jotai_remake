import { salaryAtom } from './App';
import { useAtom } from './jotai';

function SalaryDisplay() {
  const [salary] = useAtom(salaryAtom);

  return (
    <div>
      Salary:{' '}
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(salary as number)}
    </div>
  );
}

export default SalaryDisplay;
