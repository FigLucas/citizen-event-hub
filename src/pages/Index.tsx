import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserPlus, FileText, Search } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gov-gray">
      <header className="bg-primary text-primary-foreground py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Portal da Prefeitura</h1>
          <p className="text-primary-foreground/90 mt-2">Sistema de Gestão de Eventos e Recursos</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Bem-vindo ao Portal de Serviços</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acesse os serviços disponíveis para cadastro e consulta de eventos e recursos da prefeitura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/cadastro-usuario")}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Cadastro de Usuário</CardTitle>
              <CardDescription>Cadastre-se como cidadão para acessar os serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/cadastro-usuario")}>
                Acessar Cadastro
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/cadastro-pedido")}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Cadastro de Pedido</CardTitle>
              <CardDescription>Solicite a realização de eventos na cidade</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/cadastro-pedido")}>
                Criar Pedido
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/consulta-itens")}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Consulta de Itens</CardTitle>
              <CardDescription>Área administrativa para consulta do patrimônio</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" onClick={() => navigate("/consulta-itens")}>
                Consultar Itens
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-card rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-center">Sobre o Sistema</h3>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            Este portal permite que cidadãos e administradores gerenciem eventos e recursos municipais de forma eficiente. 
            Cadastre-se, crie pedidos de eventos e acompanhe o patrimônio público através de uma interface simples e intuitiva.
          </p>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Prefeitura Municipal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
