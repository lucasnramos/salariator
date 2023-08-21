import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "./FormInput";
import { ChangeEvent, useState } from "react";

type Inputs = {
  salarioBrutoMensal: number;
  totalBeneficios: number;
  totalDescontos: number;
  faturamentoMensal: number;
  despesas: number;
};

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}

        <label
          htmlFor="salarioBrutoMensal"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Salário bruto mensal
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("salarioBrutoMensal", { required: true })}
          aria-invalid={errors.salarioBrutoMensal ? "true" : "false"}
          placeholder=""
        />
        {errors.salarioBrutoMensal && <p role="alert">Campo obrigatório</p>}

        <label
          htmlFor="totalBeneficios"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Outros benefícios
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("totalBeneficios", { required: true })}
          aria-invalid={errors.totalBeneficios ? "true" : "false"}
          placeholder=""
        />
        {errors.totalBeneficios && <p role="alert">Campo obrigatório</p>}

        <label
          htmlFor="totalDescontos"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Outros descontos
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("totalDescontos", { required: true })}
          aria-invalid={errors.totalDescontos ? "true" : "false"}
          placeholder=""
        />
        {errors.totalDescontos && <p role="alert">Campo obrigatório</p>}

        {/* campos CNPJ */}

        <label
          htmlFor="faturamentoMensal"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Faturamento Mensal
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("faturamentoMensal", { required: true })}
          aria-invalid={errors.faturamentoMensal ? "true" : "false"}
        />
        {errors.faturamentoMensal && <p role="alert">Campo obrigatório</p>}

        <label
          htmlFor="despesas"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Total de Despesas testand
        </label>
        <CurrencyInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("despesas", { required: true })}
          aria-invalid={errors.despesas ? "true" : "false"}
        />
        {errors.despesas && <p role="alert">Campo obrigatório</p>}

        <input
          type="submit"
          name="submit"
          value="Calcular"
          className="text-center px-4 mt-4 py-2 font-semibold text-medium bg-sky-500 text-white  shadow-sm"
        />
      </form>
    </div>
  );
}

function CurrencyInput(props: any) {
  const [value, setValue] = useState<any>();

  function formatCurrency(number: any) {
    console.log("has changed");
    number
      ? "R$ " +
        number
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
      : "";
  }

  function handleChange(event: any) {
    console.log("has changed", event.target.value);
    const value = event.target.value;
    const onlyNums = value.replace(/[^0-9,]/g, "").replace(",", ".");
    setValue(parseFloat(onlyNums).toFixed(2));
  }

  return (
    <input value={formatCurrency(value)} onChange={handleChange} {...props} />
  );
}
