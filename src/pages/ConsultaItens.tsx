import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const ConsultaItens = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState<any[]>([]);
  const [tiposRecurso, setTiposRecurso] = useState<any[]>([]);
  const [armazens, setArmazens] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    tiporecursofisico: "all",
    statusitem: "all",
    qualidade: "all",
    armazem: "all",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterItens();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [itensRes, tiposRes, armazensRes] = await Promise.all([
        supabase.from("item").select(`
          *,
          tiporecursofisico:tiporecursofisico(nome),
          armazem:armazem(idarmazem, endereco)
        `),
        supabase.from("tiporecursofisico").select("idtiporecurso, nome"),
        supabase.from("armazem").select("idarmazem, endereco"),
      ]);

      if (itensRes.data) setItens(itensRes.data);
      if (tiposRes.data) setTiposRecurso(tiposRes.data);
      if (armazensRes.data) setArmazens(armazensRes.data);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterItens = async () => {
    setLoading(true);
    try {
      let query = supabase.from("item").select(`
        *,
        tiporecursofisico:tiporecursofisico(nome),
        armazem:armazem(idarmazem, endereco)
      `);

      if (filters.tiporecursofisico && filters.tiporecursofisico !== "all") {
        query = query.eq("tiporecursofisico", filters.tiporecursofisico);
      }
      if (filters.statusitem && filters.statusitem !== "all") {
        query = query.eq("statusitem", filters.statusitem);
      }
      if (filters.qualidade && filters.qualidade !== "all") {
        query = query.eq("qualidade", filters.qualidade);
      }
      if (filters.armazem && filters.armazem !== "all") {
        query = query.eq("armazem", filters.armazem);
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredData = data || [];
      if (filters.search) {
        filteredData = filteredData.filter((item) =>
          item.nropatrimonio.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      setItens(filteredData);
    } catch (error: any) {
      toast.error("Erro ao filtrar itens: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Disponível":
        return "bg-gov-green";
      case "Em Uso":
        return "bg-primary";
      case "Manutenção":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gov-gray py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Portal da Prefeitura</h1>
          <p className="text-muted-foreground">Consulta de Itens - Área Administrativa</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Consultar Itens do Patrimônio</CardTitle>
            <CardDescription>Utilize os filtros abaixo para buscar itens específicos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar por Número de Patrimônio</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="search"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Digite o número do patrimônio"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Recurso</Label>
                  <Select value={filters.tiporecursofisico} onValueChange={(value) => setFilters({ ...filters, tiporecursofisico: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {tiposRecurso.map((tipo) => (
                        <SelectItem key={tipo.idtiporecurso} value={tipo.idtiporecurso}>
                          {tipo.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={filters.statusitem} onValueChange={(value) => setFilters({ ...filters, statusitem: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Disponível">Disponível</SelectItem>
                      <SelectItem value="Em Uso">Em Uso</SelectItem>
                      <SelectItem value="Manutenção">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualidade">Qualidade</Label>
                  <Select value={filters.qualidade} onValueChange={(value) => setFilters({ ...filters, qualidade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="Excelente">Excelente</SelectItem>
                      <SelectItem value="Boa">Boa</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Ruim">Ruim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="armazem">Armazém</Label>
                  <Select value={filters.armazem} onValueChange={(value) => setFilters({ ...filters, armazem: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {armazens.map((arm) => (
                        <SelectItem key={arm.idarmazem} value={arm.idarmazem}>
                          {arm.idarmazem} - {arm.endereco}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={filterItens} disabled={loading} className="w-full md:w-auto">
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patrimônio</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Qualidade</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Armazém</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itens.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Nenhum item encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    itens.map((item) => (
                      <TableRow key={item.nropatrimonio}>
                        <TableCell className="font-medium">{item.nropatrimonio}</TableCell>
                        <TableCell>{item.tiporecursofisico?.nome || "-"}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.statusitem)}>{item.statusitem || "-"}</Badge>
                        </TableCell>
                        <TableCell>{item.qualidade || "-"}</TableCell>
                        <TableCell>{item.tamanho || "-"}</TableCell>
                        <TableCell>{item.armazem?.endereco || "-"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={() => navigate("/")}>
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsultaItens;
