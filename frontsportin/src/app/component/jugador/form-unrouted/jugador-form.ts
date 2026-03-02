import { Component, OnInit, Input, Output, EventEmitter, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { JugadorService } from '../../../service/jugador-service';
import { UsuarioService } from '../../../service/usuarioService';
import { EquipoService } from '../../../service/equipo';
import { IUsuario } from '../../../model/usuario';
import { IJugador } from '../../../model/jugador';
import { IEquipo } from '../../../model/equipo';
import { UsuarioPlistAdminUnrouted } from '../../usuario/plist-admin-unrouted/usuario-plist-admin-unrouted';
import { EquipoPlistAdminUnrouted } from '../../equipo/plist-admin-unrouted/equipo-plist-admin-unrouted';

@Component({
  selector: 'app-jugador-form-unrouted',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jugador-form.html',
  styleUrls: ['./jugador-form.css']
})
export class JugadorFormAdminUnrouted implements OnInit {
  @Input() jugador: IJugador | null = null;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() formSuccess = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private oJugadorService = inject(JugadorService);
  private oUsuarioService = inject(UsuarioService);
  private oEquipoService = inject(EquipoService);

  jugadorForm!: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);
  submitting = signal(false);
  selectedUsuario = signal<IUsuario | null>(null);
  selectedEquipo = signal<IEquipo | null>(null);

  constructor() {
    effect(() => {
      const j = this.jugador;
      if (j && this.jugadorForm) {
        this.loadJugadorData(j);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    if (this.jugador) {
      this.loadJugadorData(this.jugador);
    }
  }

  private initForm(): void {
    this.jugadorForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      posicion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      dorsal: [0, [Validators.required, Validators.min(0)]],
      capitan: [false],
      id_usuario: [null, Validators.required],
      id_equipo: [null, Validators.required],
      imagen: [null],
    });
  }

  private loadJugadorData(jugador: IJugador): void {
    const idUsuario = jugador.usuario?.id ?? null;
    const idEquipo = jugador.equipo?.id ?? null;

    this.jugadorForm.patchValue({
      id: jugador.id ?? 0,
      posicion: jugador.posicion ?? '',
      dorsal: jugador.dorsal ?? 0,
      capitan: !!jugador.capitan,
      id_usuario: idUsuario,
      id_equipo: idEquipo,
      imagen: jugador.imagen || null,
    });

    if (idUsuario) {
      this.syncUsuario(idUsuario);
    }
    if (idEquipo) {
      this.syncEquipo(idEquipo);
    }
  }

  private syncUsuario(idUsuario: number | null): void {
    if (!idUsuario) {
      this.selectedUsuario.set(null);
      return;
    }
    this.oUsuarioService.get(idUsuario).subscribe({
      next: (usuario: IUsuario) => this.selectedUsuario.set(usuario),
      error: (err: HttpErrorResponse) => {
        console.error('Error al sincronizar usuario:', err);
        this.selectedUsuario.set(null);
        this.snackBar.open('Error al cargar el usuario seleccionado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  private syncEquipo(idEquipo: number | null): void {
    if (!idEquipo) {
      this.selectedEquipo.set(null);
      return;
    }
    this.oEquipoService.get(idEquipo).subscribe({
      next: (equipo: IEquipo) => this.selectedEquipo.set(equipo),
      error: (err: HttpErrorResponse) => {
        console.error('Error al sincronizar equipo:', err);
        this.selectedEquipo.set(null);
        this.snackBar.open('Error al cargar el equipo seleccionado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openUsuarioFinderModal(): void {
    const dialogRef = this.dialog.open(UsuarioPlistAdminUnrouted, {
      height: '800px',
      width: '1100px',
      maxWidth: '95vw',
      panelClass: 'usuario-dialog',
      data: { title: 'Elegir usuario', message: 'Selecciona el usuario para el jugador' }
    });

    dialogRef.afterClosed().subscribe((usuario: IUsuario | null) => {
      if (usuario) {
        this.jugadorForm.patchValue({ id_usuario: usuario.id });
        this.syncUsuario(usuario.id);
        this.snackBar.open(`Usuario seleccionado: ${usuario.username}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEquipoFinderModal(): void {
    const dialogRef = this.dialog.open(EquipoPlistAdminUnrouted, {
      height: '800px',
      width: '1100px',
      maxWidth: '95vw',
      panelClass: 'equipo-dialog',
      data: { title: 'Elegir equipo', message: 'Selecciona el equipo para el jugador' }
    });

    dialogRef.afterClosed().subscribe((equipo: IEquipo | null) => {
      if (equipo) {
        this.jugadorForm.patchValue({ id_equipo: equipo.id });
        if (typeof equipo.id === 'number') {
          this.syncEquipo(equipo.id);
        }
        this.snackBar.open(`Equipo seleccionado: ${equipo.nombre}`, 'Cerrar', { duration: 3000 });
      }
    });
  }

  get posicion() { return this.jugadorForm.get('posicion'); }
  get dorsal() { return this.jugadorForm.get('dorsal'); }
  get capitan() { return this.jugadorForm.get('capitan'); }
  get id_usuario() { return this.jugadorForm.get('id_usuario'); }
  get id_equipo() { return this.jugadorForm.get('id_equipo'); }

  onSubmit(): void {
    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', { duration: 4000 });
      return;
    }

    this.submitting.set(true);

    const payload: any = {
      posicion: this.jugadorForm.value.posicion?.trim(),
      dorsal: Number(this.jugadorForm.value.dorsal),
      capitan: !!this.jugadorForm.value.capitan,
      usuario: { id: Number(this.jugadorForm.value.id_usuario) },
      equipo: { id: Number(this.jugadorForm.value.id_equipo) },
      id_usuario: Number(this.jugadorForm.value.id_usuario),
      id_equipo: Number(this.jugadorForm.value.id_equipo),
      imagen: this.jugadorForm.value.imagen || null,
      pagos: [], // ensure backend list isn't null
    };

    // sanity check for relational ids
    if (!payload.id_usuario || payload.id_usuario <= 0) {
      // should not happen due to validators, but guard anyway
      delete payload.usuario;
      delete payload.id_usuario;
    }
    if (!payload.id_equipo || payload.id_equipo <= 0) {
      delete payload.equipo;
      delete payload.id_equipo;
    }

    // debug information
    console.log('Jugador payload', payload);

    if (this.mode === 'edit' && this.jugador?.id) {
      payload.id = this.jugador.id;
      this.oJugadorService.update(payload).subscribe({
        next: () => { this.submitting.set(false); this.snackBar.open('Jugador actualizado correctamente', 'Cerrar', { duration: 4000 }); this.formSuccess.emit(); },
        error: (err: HttpErrorResponse) => { console.error('update error', err, err.error); this.error.set('Error actualizando el jugador'); this.snackBar.open('Error al actualizar el jugador', 'Cerrar', { duration: 4000 }); this.submitting.set(false); }
      });
    } else {
      this.oJugadorService.create(payload).subscribe({
        next: (id: number) => { this.submitting.set(false); this.snackBar.open('Jugador creado correctamente', 'Cerrar', { duration: 4000 }); this.formSuccess.emit(); },
        error: (err: HttpErrorResponse) => { console.error('create error', err, err.error); this.error.set('Error creando el jugador'); this.snackBar.open('Error al crear el jugador', 'Cerrar', { duration: 4000 }); this.submitting.set(false); }
      });
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
