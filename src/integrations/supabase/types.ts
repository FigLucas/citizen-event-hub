export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      aloca: {
        Row: {
          diaentrada: string
          diasaida: string
          eventodata: string
          eventonome: string
          item: string
        }
        Insert: {
          diaentrada: string
          diasaida: string
          eventodata: string
          eventonome: string
          item: string
        }
        Update: {
          diaentrada?: string
          diasaida?: string
          eventodata?: string
          eventonome?: string
          item?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_aloca_evento"
            columns: ["eventonome", "eventodata"]
            isOneToOne: false
            referencedRelation: "evento"
            referencedColumns: ["nomeeventoefetivo", "datainicioefetivo"]
          },
          {
            foreignKeyName: "fk_aloca_item"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "item"
            referencedColumns: ["nropatrimonio"]
          },
        ]
      }
      analista: {
        Row: {
          cpf: string
          nome: string
        }
        Insert: {
          cpf: string
          nome: string
        }
        Update: {
          cpf?: string
          nome?: string
        }
        Relationships: []
      }
      armazem: {
        Row: {
          capacidademax: number
          endereco: string
          idarmazem: string
        }
        Insert: {
          capacidademax: number
          endereco: string
          idarmazem: string
        }
        Update: {
          capacidademax?: number
          endereco?: string
          idarmazem?: string
        }
        Relationships: []
      }
      c: {
        Row: {
          cargo: string
          cpf: string
        }
        Insert: {
          cargo: string
          cpf: string
        }
        Update: {
          cargo?: string
          cpf?: string
        }
        Relationships: []
      }
      doc_rh: {
        Row: {
          documentoderequisito: string
          quantidade: number
          recursohumano: string
        }
        Insert: {
          documentoderequisito: string
          quantidade: number
          recursohumano: string
        }
        Update: {
          documentoderequisito?: string
          quantidade?: number
          recursohumano?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_doc_rh"
            columns: ["documentoderequisito"]
            isOneToOne: false
            referencedRelation: "documentoderequisito"
            referencedColumns: ["pedido"]
          },
          {
            foreignKeyName: "fk_doc_rh2"
            columns: ["recursohumano"]
            isOneToOne: false
            referencedRelation: "recursohumano"
            referencedColumns: ["nomeprofissao"]
          },
        ]
      }
      doc_tiporecurso: {
        Row: {
          documentoderequisito: string
          quantidade: number
          tiporecursofisico: string
        }
        Insert: {
          documentoderequisito: string
          quantidade: number
          tiporecursofisico: string
        }
        Update: {
          documentoderequisito?: string
          quantidade?: number
          tiporecursofisico?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_doc_tiporecurso"
            columns: ["documentoderequisito"]
            isOneToOne: false
            referencedRelation: "documentoderequisito"
            referencedColumns: ["pedido"]
          },
          {
            foreignKeyName: "fk_doc_tiporecurso2"
            columns: ["tiporecursofisico"]
            isOneToOne: false
            referencedRelation: "tiporecursofisico"
            referencedColumns: ["idtiporecurso"]
          },
        ]
      }
      documentoderequisito: {
        Row: {
          pedido: string
          status: string | null
        }
        Insert: {
          pedido: string
          status?: string | null
        }
        Update: {
          pedido?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_documento"
            columns: ["pedido"]
            isOneToOne: true
            referencedRelation: "pedido"
            referencedColumns: ["idpedido"]
          },
        ]
      }
      evento: {
        Row: {
          datafimevento: string
          datainicioefetivo: string
          localefetivo: string
          nomeeventoefetivo: string
          pedido: string
          statusdefinitivo: string
        }
        Insert: {
          datafimevento: string
          datainicioefetivo: string
          localefetivo: string
          nomeeventoefetivo: string
          pedido: string
          statusdefinitivo: string
        }
        Update: {
          datafimevento?: string
          datainicioefetivo?: string
          localefetivo?: string
          nomeeventoefetivo?: string
          pedido?: string
          statusdefinitivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_evento"
            columns: ["pedido"]
            isOneToOne: true
            referencedRelation: "pedido"
            referencedColumns: ["idpedido"]
          },
        ]
      }
      gerente: {
        Row: {
          cpf: string
          nome: string
        }
        Insert: {
          cpf: string
          nome: string
        }
        Update: {
          cpf?: string
          nome?: string
        }
        Relationships: []
      }
      item: {
        Row: {
          armazem: string | null
          nropatrimonio: string
          qualidade: string | null
          statusitem: string | null
          tamanho: number
          tiporecursofisico: string
        }
        Insert: {
          armazem?: string | null
          nropatrimonio: string
          qualidade?: string | null
          statusitem?: string | null
          tamanho: number
          tiporecursofisico: string
        }
        Update: {
          armazem?: string | null
          nropatrimonio?: string
          qualidade?: string | null
          statusitem?: string | null
          tamanho?: number
          tiporecursofisico?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_item"
            columns: ["tiporecursofisico"]
            isOneToOne: false
            referencedRelation: "tiporecursofisico"
            referencedColumns: ["idtiporecurso"]
          },
          {
            foreignKeyName: "fk_item2"
            columns: ["armazem"]
            isOneToOne: false
            referencedRelation: "armazem"
            referencedColumns: ["idarmazem"]
          },
        ]
      }
      pedido: {
        Row: {
          analista: string
          datafimproposto: string | null
          datainicioproposto: string | null
          datasubmissao: string | null
          descricao: string | null
          gerente: string
          idpedido: string
          localproposto: string | null
          nomeeventoproposto: string | null
          status: string
          usuario: string
        }
        Insert: {
          analista: string
          datafimproposto?: string | null
          datainicioproposto?: string | null
          datasubmissao?: string | null
          descricao?: string | null
          gerente: string
          idpedido: string
          localproposto?: string | null
          nomeeventoproposto?: string | null
          status?: string
          usuario: string
        }
        Update: {
          analista?: string
          datafimproposto?: string | null
          datainicioproposto?: string | null
          datasubmissao?: string | null
          descricao?: string | null
          gerente?: string
          idpedido?: string
          localproposto?: string | null
          nomeeventoproposto?: string | null
          status?: string
          usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pedido"
            columns: ["usuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["ndoc"]
          },
          {
            foreignKeyName: "fk_pedido2"
            columns: ["analista"]
            isOneToOne: false
            referencedRelation: "analista"
            referencedColumns: ["cpf"]
          },
          {
            foreignKeyName: "fk_pedido3"
            columns: ["gerente"]
            isOneToOne: false
            referencedRelation: "gerente"
            referencedColumns: ["cpf"]
          },
        ]
      }
      proposta: {
        Row: {
          analista: string
          data: string
          descricaoproposta: string
          usuario: string
        }
        Insert: {
          analista: string
          data: string
          descricaoproposta: string
          usuario: string
        }
        Update: {
          analista?: string
          data?: string
          descricaoproposta?: string
          usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_proposta"
            columns: ["analista"]
            isOneToOne: false
            referencedRelation: "analista"
            referencedColumns: ["cpf"]
          },
          {
            foreignKeyName: "fk_proposta2"
            columns: ["usuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["ndoc"]
          },
        ]
      }
      recursohumano: {
        Row: {
          descricao: string | null
          nomeprofissao: string
        }
        Insert: {
          descricao?: string | null
          nomeprofissao: string
        }
        Update: {
          descricao?: string | null
          nomeprofissao?: string
        }
        Relationships: []
      }
      tiporecursofisico: {
        Row: {
          descricao: string | null
          idtiporecurso: string
          nome: string
        }
        Insert: {
          descricao?: string | null
          idtiporecurso: string
          nome: string
        }
        Update: {
          descricao?: string | null
          idtiporecurso?: string
          nome?: string
        }
        Relationships: []
      }
      usuario: {
        Row: {
          datanasc: string | null
          email: string
          ndoc: string
          nome: string | null
          razaosocial: string | null
          rg: string | null
          tipodoc: string
        }
        Insert: {
          datanasc?: string | null
          email: string
          ndoc: string
          nome?: string | null
          razaosocial?: string | null
          rg?: string | null
          tipodoc: string
        }
        Update: {
          datanasc?: string | null
          email?: string
          ndoc?: string
          nome?: string | null
          razaosocial?: string | null
          rg?: string | null
          tipodoc?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
