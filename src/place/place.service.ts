import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CoordinateDto, CoordinateListParameterDto, CoordinateParameterDto } from './dto/coordinateDto';

@Injectable()
export class PlaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly Jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) { }

  EARTH_RADIUS = 6371;
  MAX_DEGREE = 180;
  MIN_DISTANCE_PLACE = 20;

  /**
   * Récupère une liste de places autour d'un point géographique
   * 
   * @param {CoordinateDto} coordinates - Coordonnées initiales
   * @returns 
   */
  async placeAroundOneCoordinates(coordinateParameterDto: CoordinateParameterDto) {

    const { maxDistance, coordinate } = coordinateParameterDto;
    const leftTopPoint = this.getShiftedPointByDistance(coordinate, maxDistance, -maxDistance);
    const rigthBottomPoint = this.getShiftedPointByDistance(coordinate, -maxDistance, maxDistance);

    return {
      places:
        await this.findPlacesInSquare(
          rigthBottomPoint.latitude,
          leftTopPoint.latitude,
          leftTopPoint.longitude,
          rigthBottomPoint.longitude
        )
    };
  }

  /**
   * Récupère une liste de places autour d'une liste de points géographique
   * 
   * @param {CoordinateDto[]} coordinatesList 
   * @returns 
   */
  async placeAroundManyCoordinates(
    coordinateListParameterDto: CoordinateListParameterDto
  ) {

    const { coordinateList, maxDistance } = coordinateListParameterDto;

    const filteredCoordinates = this.filterCoordinatesByDistance(coordinateList, maxDistance);

    console.log("Coordonnées d'origine :", coordinateList);
    console.log("Coordonnées filtrées :", filteredCoordinates);

    let placeList = [];

    for (const coordinates of filteredCoordinates) {
      const leftTopPoint = this.getShiftedPointByDistance(coordinates, +maxDistance, -maxDistance);
      const rigthBottomPoint = this.getShiftedPointByDistance(coordinates, -maxDistance, +maxDistance);

      const currentPlaceList = await this.findPlacesInSquare(
        rigthBottomPoint.latitude,
        leftTopPoint.latitude,
        leftTopPoint.longitude,
        rigthBottomPoint.longitude
      )

      // Filtrer les places déjà présentes dans placeList
      const newPlaces = currentPlaceList.filter(place =>
        !placeList.some(existingPlace => existingPlace.id === place.id)
      );

      placeList = [...placeList, ...newPlaces];

    }

    return { places: placeList };
  }

  /**
   * Trouve les places dans un carré de coordonnée définit
   * 
   * @param {number} latitudeMin 
   * @param {number} latitudeMax 
   * @param {number} longitudeMin 
   * @param {number} longitudeMax 
   * @returns 
   */
  async findPlacesInSquare(latitudeMin: number, latitudeMax: number, longitudeMin: number, longitudeMax: number) {
    return await this.prismaService.place.findMany({
      where: {
        latitude: {
          gte: latitudeMin,
          lte: latitudeMax,
        },
        longitude: {
          gte: longitudeMin,
          lte: longitudeMax,
        },
      },
      include: {
        categoryPlaces: {
          include: {
            category: true, // Include the actual Category information
          },
        },
      },
    });
  }

  /**
   * Calcul la position d'une coordonnée géographique situé à une distance précise
   * 
   * @param {CoordinateDto} coordinates - Coordonnées initiales
   * @param {number} xDistance - Disance en x 
   * @param {number} yDistance - Disance en y
   * @returns 
   */
  getShiftedPointByDistance(coordinates: CoordinateDto, xDistance: number, yDistance: number) {
    // Convertir les distances en radians en utilisant la formule de haversine
    const latitudeDistanceRadians = xDistance / this.EARTH_RADIUS;
    const longitudeDistanceRadians = yDistance / (this.EARTH_RADIUS * Math.cos(coordinates.latitude * (Math.PI / 180)));

    // Nouvelles coordonnées en degrés
    const newLatitude = coordinates.latitude + latitudeDistanceRadians * (this.MAX_DEGREE / Math.PI);
    const newLongitude = coordinates.longitude + longitudeDistanceRadians * (this.MAX_DEGREE / Math.PI);

    // Renvoyer les nouvelles coordonnées
    return { latitude: newLatitude, longitude: newLongitude };
  }

  /**
   * Filtre les coordonnées géographiques trop proches
   * 
   * @param {CoordinateDto[]} coordinates - Liste de coordonnées géographiques
   * @param {number} minimumDistance - Distance minimal entre deux points
   * @returns 
   */
  filterCoordinatesByDistance(coordinates: CoordinateDto[], minimumDistance: number) {
    const filteredCoordinates = [];

    // Ajouter le premier point
    if (coordinates.length > 0) {
      filteredCoordinates.push(coordinates[0]);
    }

    // Conservation des coordonnées espacés d'au moins xkm
    for (let i = 1; i < coordinates.length; i++) {
      const prevCoordinate = filteredCoordinates[filteredCoordinates.length - 1];
      const currentCoordinate = coordinates[i];
      const distance = this.calculateDistance(
        prevCoordinate.latitude,
        prevCoordinate.longitude,
        currentCoordinate.latitude,
        currentCoordinate.longitude
      );

      if (distance >= minimumDistance) {
        filteredCoordinates.push(currentCoordinate);
      }
    }

    return filteredCoordinates;
  }

  /**
   * Fonction pour calculer la distance entre deux points en coordonnées géographiques
   * 
   * @param {number} latitude1 
   * @param {number} longitude1 
   * @param {number} latitude2 
   * @param {number} longitude2 
   * @returns {number} - La distance entre les deux points
   */
  calculateDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number) {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (latitude2 - latitude1) * (Math.PI / 180);
    const dLon = (longitude2 - longitude1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latitude1 * (Math.PI / 180)) *
      Math.cos(latitude2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
}
