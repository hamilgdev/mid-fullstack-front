import { css } from 'styled-system/css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAuthContext } from '@/hooks/useAuthHook';

type SignInInputs = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      const success = await login(data.email);

      if (!success) {
        setError('email', {
          type: 'manual',
          message: 'Credenciales inválidas o usuario no encontrado',
        });
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('email', {
        type: 'manual',
        message: 'Error interno del servidor',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
        padding: '6',
        backgroundColor: 'white',
        borderRadius: 'md',
        boxShadow: 'xs',
        maxWidth: '400px',
        width: '100%',
        marginInline: 'auto',
      })}
    >
      <div
        className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}
      >
        <label
          htmlFor='email'
          className={css({
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'gray.700',
          })}
        >
          Correo Electrónico
        </label>
        <input
          id='email'
          type='email'
          {...register('email', {
            required: 'El email es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
          className={css({
            padding: '3',
            border: '1px solid',
            borderColor: errors.email ? 'red.400' : 'gray.300',
            borderRadius: 'md',
            fontSize: 'sm',
            outline: 'none',
            _focus: {
              borderColor: errors.email ? 'red.400' : 'blue.500',
              boxShadow: '0 0 0 1px',
              boxShadowColor: errors.email ? 'red.400' : 'blue.500',
            },
          })}
          placeholder='tu@email.com'
        />
        {errors.email && (
          <span
            className={css({
              fontSize: 'xs',
              color: 'red.500',
            })}
          >
            {errors.email.message}
          </span>
        )}
      </div>

      <div
        className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}
      >
        <label
          htmlFor='password'
          className={css({
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'gray.700',
          })}
        >
          Contraseña
        </label>
        <input
          id='password'
          type='password'
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
          className={css({
            padding: '3',
            border: '1px solid',
            borderColor: errors.password ? 'red.400' : 'gray.300',
            borderRadius: 'md',
            fontSize: 'sm',
            outline: 'none',
            _focus: {
              borderColor: errors.password ? 'red.400' : 'blue.500',
              boxShadow: '0 0 0 1px',
              boxShadowColor: errors.password ? 'red.400' : 'blue.500',
            },
          })}
          placeholder='••••••••'
        />
        {errors.password && (
          <span
            className={css({
              fontSize: 'xs',
              color: 'red.500',
            })}
          >
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type='submit'
        className={css({
          padding: '3',
          backgroundColor: 'blue.600',
          color: 'white',
          border: 'none',
          borderRadius: 'md',
          fontSize: 'sm',
          fontWeight: 'medium',
          cursor: 'pointer',
          marginTop: '2',
          _hover: {
            backgroundColor: 'blue.700',
          },
          _active: {
            backgroundColor: 'blue.800',
          },
        })}
      >
        Iniciar Sesión
      </button>
    </form>
  );
};
