import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CadastroPedido = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [analistas, setAnalistas] = useState<any[]>([]);
  const [gerentes, setGerentes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nomeeventoproposto: "",
    datainicioproposto: "",
    datafimproposto: "",
    localproposto: "",
    descricao: "",
    usuario: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usuariosRes, analistasRes, gerentesRes] = await Promise.all([
        supabase.from("usuario").select("ndoc, nome, email"),
        supabase.from("analista").select("cpf, nome"),
        supabase.from("gerente").select("cpf, nome"),
      ]);

      if (usuariosRes.data) setUsuarios(usuariosRes.data);
      if (analistasRes.data) setAnalistas(analistasRes.data);
      if (gerentesRes.data) setGerentes(gerentesRes.data);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Selecionar primeiro analista e gerente disponíveis
      if (analistas.length === 0 || gerentes.length === 0) {
        toast.error("É necessário ter ao menos um analista e um gerente cadastrados no sistema");
        setLoading(false);
        return;
      }

      const idpedido = `PED-${Date.now()}`;
      
      const { error } = await supabase.from("pedido").insert([
        {
          idpedido,
          nomeeventoproposto: formData.nomeeventoproposto || null,
          datainicioproposto: formData.datainicioproposto || null,
          datafimproposto: formData.datafimproposto || null,
          localproposto: formData.localproposto || null,
          descricao: formData.descricao || null,
          usuario: formData.usuario,
          analista: analistas[0].cpf,
          gerente: gerentes[0].cpf,
          datasubmissao: new Date().toISOString().split('T')[0],
          status: "Em Análise",
        },
      ]);

      if (error) throw error;

      toast.success("Pedido cadastrado com sucesso!");
      setFormData({
        nomeeventoproposto: "",
        datainicioproposto: "",
        datafimproposto: "",
        localproposto: "",
        descricao: "",
        usuario: "",
      });
    } catch (error: any) {
      toast.error("Erro ao cadastrar pedido: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gov-gray py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Portal da Prefeitura</h1>
          <p className="text-muted-foreground">Cadastro de Pedido de Evento</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Novo Pedido de Evento</CardTitle>
            <CardDescription>Preencha as informações do evento que deseja realizar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuário*</Label>
                <Select required value={formData.usuario} onValueChange={(value) => setFormData({ ...formData, usuario: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios.map((user) => (
                      <SelectItem key={user.ndoc} value={user.ndoc}>
                        {user.nome || user.email} - {user.ndoc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeeventoproposto">Nome do Evento</Label>
                <Input
                  id="nomeeventoproposto"
                  value={formData.nomeeventoproposto}
                  onChange={(e) => setFormData({ ...formData, nomeeventoproposto: e.target.value })}
                  placeholder="Nome do evento"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="datainicioproposto">Data Inicial</Label>
                  <Input
                    id="datainicioproposto"
                    type="date"
                    value={formData.datainicioproposto}
                    onChange={(e) => setFormData({ ...formData, datainicioproposto: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="datafimproposto">Data Final</Label>
                  <Input
                    id="datafimproposto"
                    type="date"
                    value={formData.datafimproposto}
                    onChange={(e) => setFormData({ ...formData, datafimproposto: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="localproposto">Local</Label>
                <Input
                  id="localproposto"
                  value={formData.localproposto}
                  onChange={(e) => setFormData({ ...formData, localproposto: e.target.value })}
                  placeholder="Local do evento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o evento"
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Cadastrando..." : "Cadastrar Pedido"}
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

export default CadastroPedido;
