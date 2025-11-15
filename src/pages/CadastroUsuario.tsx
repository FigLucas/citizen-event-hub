import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CadastroUsuario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    datanasc: "",
    tipodoc: "CPF",
    ndoc: "",
    rg: "",
    email: "",
    razaosocial: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("usuario").insert([
        {
          nome: formData.nome || null,
          datanasc: formData.datanasc || null,
          tipodoc: formData.tipodoc,
          ndoc: formData.ndoc,
          rg: formData.rg || null,
          email: formData.email,
          razaosocial: formData.razaosocial || null,
        },
      ]);

      if (error) throw error;

      toast.success("Usuário cadastrado com sucesso!");
      setFormData({
        nome: "",
        datanasc: "",
        tipodoc: "CPF",
        ndoc: "",
        rg: "",
        email: "",
        razaosocial: "",
      });
    } catch (error: any) {
      toast.error("Erro ao cadastrar usuário: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gov-gray py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Portal da Prefeitura</h1>
          <p className="text-muted-foreground">Cadastro de Usuário</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro de Cidadão</CardTitle>
            <CardDescription>Preencha seus dados para acessar os serviços da prefeitura</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="datanasc">Data de Nascimento</Label>
                <Input
                  id="datanasc"
                  type="date"
                  value={formData.datanasc}
                  onChange={(e) => setFormData({ ...formData, datanasc: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipodoc">Tipo de Documento</Label>
                  <Select value={formData.tipodoc} onValueChange={(value) => setFormData({ ...formData, tipodoc: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPF">CPF</SelectItem>
                      <SelectItem value="CNPJ">CNPJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ndoc">Número do Documento*</Label>
                  <Input
                    id="ndoc"
                    required
                    value={formData.ndoc}
                    onChange={(e) => setFormData({ ...formData, ndoc: e.target.value })}
                    placeholder={formData.tipodoc === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input
                  id="rg"
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                  placeholder="Digite seu RG"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              {formData.tipodoc === "CNPJ" && (
                <div className="space-y-2">
                  <Label htmlFor="razaosocial">Razão Social</Label>
                  <Input
                    id="razaosocial"
                    value={formData.razaosocial}
                    onChange={(e) => setFormData({ ...formData, razaosocial: e.target.value })}
                    placeholder="Nome da empresa"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1">
                  Voltar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CadastroUsuario;
