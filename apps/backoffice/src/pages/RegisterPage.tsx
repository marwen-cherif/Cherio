import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Paper,
  Text,
  Divider,
  Group,
  Anchor,
  Stack,
  SimpleGrid,
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? 'Le prénom doit comporter au moins 2 caractères' : null,
      lastName: (value) =>
        value.length < 2 ? 'Le nom doit comporter au moins 2 caractères' : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) =>
        value.length < 6 ? 'Le mot de passe doit comporter au moins 6 caractères' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Les mots de passe ne correspondent pas' : null,
    },
  });

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      await register(values.email, values.password, values.firstName, values.lastName);
      navigate('/');
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError("L'inscription a échoué. Cet email est peut-être déjà utilisé.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Title order={2} ta="center" mb="md">
          Créer un compte Cherio Back-office
        </Title>

        {error && (
          <Text color="red" ta="center" mb="md">
            {error}
          </Text>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Prénom"
                placeholder="Prénom"
                required
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Nom"
                placeholder="Nom"
                required
                {...form.getInputProps('lastName')}
              />
            </SimpleGrid>

            <TextInput
              label="Email"
              placeholder="votre@email.com"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Mot de passe"
              placeholder="Votre mot de passe"
              required
              {...form.getInputProps('password')}
            />

            <PasswordInput
              label="Confirmer le mot de passe"
              placeholder="Confirmez votre mot de passe"
              required
              {...form.getInputProps('confirmPassword')}
            />

            <Button type="submit" fullWidth loading={isLoading}>
              S'inscrire
            </Button>
          </Stack>
        </form>

        <Divider label="Ou" labelPosition="center" my="lg" />

        <Group justify="center" mt="md">
          <Text fz="sm">
            Déjà un compte?{' '}
            <Anchor component={Link} to="/login" fw={700}>
              Se connecter
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}
